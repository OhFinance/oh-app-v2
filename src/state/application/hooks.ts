import { useActiveWeb3React } from '~/hooks/web3';
import { AppState } from '..';
import { useAppSelector } from '../hooks';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}
