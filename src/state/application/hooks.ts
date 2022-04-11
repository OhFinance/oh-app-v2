import axios from 'axios';
import { CandlestickData, UTCTimestamp } from 'lightweight-charts';
import { useCallback, useMemo } from 'react';
import { AlertProps } from '~/components/Alert';
import { useActiveWeb3React } from '~/hooks/web3';
import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addAlert,
  ApplicationModal,
  ChartTimeRange,
  removeAlert,
  setChart,
  setOpenModal,
} from './reducer';

function convertData(input: CandlestickData[], denominator: number) {
  return input.reduce((memo, curr, i) => {
    let current = memo[memo.length - 1];
    const timedId = Math.floor((curr.time as number) / denominator);

    if (current && Math.floor((current.time as number) / denominator) === timedId) {
      if (current.high < curr.high) {
        current.high = curr.high;
      }
      if (current.low > curr.low) {
        current.low = curr.low;
      }
      current.close = curr.close;
      memo[memo.length - 1] = current;
    } else {
      memo.push({ ...curr, time: (timedId * denominator) as UTCTimestamp });
    }

    return memo;
  }, [] as CandlestickData[]);
}

function createChartObject(data: { tvl: number; timestamp: string }[]): {
  [range in ChartTimeRange]: CandlestickData[];
} {
  const hour: CandlestickData[] = data
    .map(({ timestamp, tvl }) => ({
      time: Math.floor(new Date(timestamp).getTime() / 1000) as UTCTimestamp,
      open: tvl,
      high: tvl,
      low: tvl,
      close: tvl,
    }))
    .sort((a, b) => (a.time as number) - (b.time as number))
    // put the max at 1 billion, because of wrong data in api
    .filter(
      (entry, i, self) =>
        i === self.findIndex((t) => t.time === entry.time) && entry.open <= 1_000_000_000
    );
  const day = convertData(hour, 86400);

  const week = convertData(day, 604_800);
  const month = convertData(week, 2_628_000);
  return {
    hour,
    day,
    week,
    month,
    all: day,
  };
}

export function useFetchChartCallback() {
  const dispatch = useAppDispatch();

  return useCallback(async () => {
    return axios
      .get<{ data: { tvl: number; timestamp: string }[] }>(
        `https://api.oh.finance/tvl/history?addr=all&chain=-1&start=0`
      )
      .then(({ data }) => {
        // set
        const obj = createChartObject(data.data);
        dispatch(setChart(obj));
        return obj;
      })
      .catch((err) => {
        throw err;
      });
  }, [dispatch]);
}

export function useChart(timeframe: ChartTimeRange): null | CandlestickData[] {
  const allCharts = useAppSelector((state) => state.application.tvlChart);
  return useMemo(() => (allCharts !== null ? allCharts[timeframe] : null), [allCharts, timeframe]);
}

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

export function useAddAlertCallback() {
  const dispatch = useAppDispatch();

  return useCallback(
    (key: string | null, props: AlertProps, removeAfterMs?: number) => {
      dispatch(addAlert({ key, props, removeAfterMs }));
    },
    [dispatch]
  );
}

export function useAlerts() {
  return useAppSelector((state) => state.application.alertList);
}

export function useRemoveAlertCallback() {
  const dispatch = useAppDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removeAlert({ key }));
    },
    [dispatch]
  );
}
