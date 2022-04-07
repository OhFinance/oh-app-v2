import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '~/state';
import { useAppSelector } from '../hooks';
import { SetBankAPY } from './actions';
import { setBankAPY } from './reducer';
import { APYData, BankStore } from './types';

interface ApyAPIResponse {
  apys: { apy: number; timespan_days: number }[];

  timestamp_updated: string;
  addr: string;
}

export function useFetchChartCallback() {
  const { chainId } = useWeb3React();
  return useCallback(async (contractAddress: string) => {
    if (!chainId) {
      return;
    } else {
      const respo = axios.get(`https://api.oh.finance/tvl/history?addr=all&chain=-1&start=0`);
    }
  }, []);
}

export function useFetchBankInfoCallback() {
  return useCallback(async (chainId: number, contractAddress: string) => {
    return axios
      .get<ApyAPIResponse>(`https://api.oh.finance/apy?chain=${chainId}&addr=${contractAddress}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }, []);
}

export const useBankAPYManager = (): [(bankAPYs: SetBankAPY[]) => void] => {
  const dispatch = useDispatch<AppDispatch>();

  const setBankAPYData = useCallback(
    (bankAPYs: SetBankAPY[]) => {
      dispatch(setBankAPY(bankAPYs));
    },
    [dispatch]
  );

  return [setBankAPYData];
};

export function useBankStore(chainId: number): BankStore | null {
  return useAppSelector((state) => state.banks[chainId] ?? null);
}

export const useBankAPYData = (chainId: number, address: string): APYData[] | undefined => {
  const apys = useSelector<AppState, APYData[] | undefined>(
    (s) =>
      s.banks && s.banks[chainId] && s.banks[chainId][address] && s.banks[chainId][address].apys
  );
  return apys;
};
