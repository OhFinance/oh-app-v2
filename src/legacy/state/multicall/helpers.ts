import { FunctionFragment, Interface } from '@ethersproject/abi';
import { Call, CallResult, CallState, MethodArg, MethodArgs, Result } from './types';

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/;

export const toCallKey = (call: Call): string => {
  if (!ADDRESS_REGEX.test(call.address)) {
    throw new Error(`Invalid address: ${call.address}`);
  }
  if (!LOWER_HEX_REGEX.test(call.callData)) {
    throw new Error(`Invalid hex: ${call.callData}`);
  }
  return `${call.address}-${call.callData}`;
};

export const parseCallKey = (callKey: string): Call => {
  const pcs = callKey.split('-');
  if (pcs.length !== 2) {
    throw new Error(`Invalid call key: ${callKey}`);
  }
  return {
    address: pcs[0],
    callData: pcs[1],
  };
};

export const isMethodArg = (x: unknown): x is MethodArg => {
  return ['string', 'number'].indexOf(typeof x) !== -1;
};

export const isValidMethodArgs = (x: unknown): x is MethodArgs | undefined => {
  return (
    x === undefined ||
    (Array.isArray(x) &&
      x.every((xi) => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
  );
};

export const INVALID_CALL_RESULT: CallResult = {
  valid: false,
  blockNumber: undefined,
  data: undefined,
};

export const INVALID_CALL_STATE: CallState = {
  valid: false,
  result: undefined,
  loading: false,
  syncing: false,
  error: false,
};

export const LOADING_CALL_STATE: CallState = {
  valid: true,
  result: undefined,
  loading: true,
  syncing: true,
  error: false,
};

export const toCallState = (
  callResult: CallResult | undefined,
  contractInterface: Interface | undefined,
  fragment: FunctionFragment | undefined,
  latestBlockNumber: number | undefined
): CallState => {
  if (!callResult) return INVALID_CALL_STATE;
  const { valid, data, blockNumber } = callResult;
  if (!valid) return INVALID_CALL_STATE;
  if (valid && !blockNumber) return LOADING_CALL_STATE;
  if (!contractInterface || !fragment || !latestBlockNumber) return LOADING_CALL_STATE;
  const success = data && data.length > 2;
  const syncing = (blockNumber ?? 0) < latestBlockNumber;
  let result: Result | undefined;
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data);
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data);
      return {
        valid: true,
        loading: false,
        error: true,
        syncing,
        result,
      };
    }
  }
  return {
    valid: true,
    loading: false,
    syncing,
    result,
    error: !success,
  };
};
