import { APYData } from './types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state';
import { setBankAPY } from './state';
import { SetBankAPY } from './actions';

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

export const useBankAPYData = (chainId: number, address: string): APYData[] | undefined => {
  const apys = useSelector<AppState, APYData[] | undefined>(
    (s) =>
      s.banks && s.banks[chainId] && s.banks[chainId][address] && s.banks[chainId][address].apys
  );

  return apys;
};
