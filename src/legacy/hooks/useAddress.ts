import { Address } from 'config/constants/types';
import { useMemo } from 'react';
import { useWeb3 } from './useWeb3';

export const useAddress = (address: Address): string => {
  const { chainId } = useWeb3();

  return useMemo(() => (address as any)[chainId as number], [address, chainId]);
};
