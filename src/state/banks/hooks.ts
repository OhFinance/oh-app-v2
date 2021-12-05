import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state';
import { useAppSelector } from '../hooks';
import { SetBankAPY } from './actions';
import { setBankAPY } from './reducer';
import { APYData, BankStore } from './types';

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
