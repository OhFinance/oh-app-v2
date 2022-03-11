import { banks } from 'constants/banks';
import { useMemo } from 'react';
import { useActiveWeb3React } from './web3';

export default function useBank() {
  const { chainId } = useActiveWeb3React();
  return useMemo(() => (typeof chainId !== 'undefined' ? banks[chainId] : null), [chainId]);
}
