import { Contract } from '@ethersproject/contracts';
import { useWeb3 } from 'hooks/useWeb3';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state';
import { useBlock } from 'state/block/hooks';
import {
  INVALID_CALL_RESULT,
  isValidMethodArgs,
  parseCallKey,
  toCallKey,
  toCallState,
} from './helpers';
import { addMulticallListeners, removeMulticallListeners } from './state';
import { Call, CallResult, CallState, ListenerOptions, OptionalMethodInputs } from './types';

// the lowest level call for subscribing to contract data
function useCallsData(calls: (Call | undefined)[], options?: ListenerOptions): CallResult[] {
  const { chainId } = useWeb3();
  const callResults = useSelector<AppState, AppState['multicall']['callResults']>(
    (state) => state.multicall.callResults
  );
  const dispatch = useDispatch<AppDispatch>();

  const serializedCallKeys: string = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.filter((c): c is Call => Boolean(c))
          ?.map(toCallKey)
          ?.sort() ?? []
      ),
    [calls]
  );

  // update listeners when there is an actual change that persists for at least 100ms
  useEffect(() => {
    const callKeys: string[] = JSON.parse(serializedCallKeys);
    if (!chainId || callKeys.length === 0) {
      return undefined;
    }

    const calls = callKeys.map((key) => parseCallKey(key));
    dispatch(
      addMulticallListeners({
        chainId,
        calls,
        options,
      })
    );

    return () => {
      dispatch(
        removeMulticallListeners({
          chainId,
          calls,
          options,
        })
      );
    };
  }, [chainId, dispatch, options, serializedCallKeys]);

  return useMemo(
    () =>
      calls.map<CallResult>((call) => {
        if (!chainId || !call) {
          return INVALID_CALL_RESULT;
        }

        const result = callResults[chainId]?.[toCallKey(call)];
        let data;
        if (result?.data && result?.data !== '0x') {
          // eslint-disable-next-line prefer-destructuring
          data = result.data;
        }

        return { valid: true, data, blockNumber: result?.blockNumber };
      }),
    [callResults, calls, chainId]
  );
}

export const useSingleCallResult = (
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptions
): CallState => {
  const fragment = useMemo(
    () => contract?.interface?.getFunction(methodName),
    [contract, methodName]
  );

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : [];
  }, [contract, fragment, inputs]);

  const result = useCallsData(calls, options)[0];
  const { currentBlock } = useBlock();

  return useMemo(() => {
    return toCallState(result, contract?.interface, fragment, currentBlock);
  }, [result, contract, fragment, currentBlock]);
};
