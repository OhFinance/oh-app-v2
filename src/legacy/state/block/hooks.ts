import { useIsBrowserTabActive } from 'hooks/useIsBrowserTabActive';
import { useWeb3 } from 'hooks/useWeb3';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from 'state';
import { setBlock } from './state';

export const usePollBlockNumber = (refreshTime = 6000) => {
  const timer: MutableRefObject<NodeJS.Timeout | null> = useRef(null);
  const dispatch = useAppDispatch();
  const isBrowserTabActiveRef = useIsBrowserTabActive();
  const { library } = useWeb3();

  useEffect(() => {
    if (isBrowserTabActiveRef && library) {
      timer.current = setInterval(async () => {
        const blockNumber = await library.getBlockNumber();
        dispatch(setBlock(blockNumber));
      }, refreshTime);
    } else if (timer.current != null) {
      clearInterval(timer.current);
    }

    return () => {
      if (timer.current != null) {
        clearInterval(timer.current);
      }
    };
  }, [dispatch, library, timer, isBrowserTabActiveRef, refreshTime]);
};

export const useBlock = () => {
  return useSelector((state: AppState) => state.block);
};

export const useInitialBlock = () => {
  return useSelector((state: AppState) => state.block.initialBlock);
};
