import { useCallback, useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import useIsWindowVisible from '~/hooks/useIsWindowVisible';
import { useActiveWeb3React } from '~/hooks/web3';
import { useAppDispatch, useAppSelector } from '~/state/hooks';
import { supportedChainId } from '~/utilities/supportedChainId';
import { switchToNetwork } from '~/utilities/switchToNetwork';
import { useFetchChartCallback } from './hooks';
import { setImplements3085, updateBlockNumber, updateChainId } from './reducer';

export default function Updater(): null {
  const { account, chainId, library } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const windowVisible = useIsWindowVisible();
  const fetchTvlChart = useFetchChartCallback();

  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
        }
        return state;
      });
    },
    [chainId, setState]
  );

  const fetchTvlChartCallback: (tries?: number) => Promise<boolean> = useCallback(
    async (tries: number = 0): Promise<boolean> => {
      return fetchTvlChart()
        .then(() => true)
        .catch((err) => {
          if (tries >= 5) {
            console.error(err);
            return false;
          }
          console.debug('Error fetch TVL chart, retrying...', err.message);
          return fetchTvlChartCallback(tries + 1);
        });
    },
    [fetchTvlChart]
  );

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));

    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      })
    );
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  useEffect(() => {
    dispatch(
      updateChainId({
        chainId: debouncedState.chainId ? supportedChainId(debouncedState.chainId) ?? null : null,
      })
    );
  }, [dispatch, debouncedState.chainId]);

  const implements3085 = useAppSelector((state) => state.application.implements3085);

  useEffect(() => {
    if (!library?.provider?.request) {
      dispatch(setImplements3085({ implements3085: false }));
    } else if (account && !implements3085) {
      switchToNetwork({ library })
        .then((x) => x ?? dispatch(setImplements3085({ implements3085: true })))
        .catch(() => dispatch(setImplements3085({ implements3085: false })));
    } else if (!account && implements3085) {
      dispatch(setImplements3085({ implements3085: false }));
    }
  }, [account, dispatch, implements3085, library]);

  useEffect(() => {
    fetchTvlChartCallback();
  }, [fetchTvlChartCallback]);
  return null;
}
