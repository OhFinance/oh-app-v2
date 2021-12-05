import ERC20_ABI from '~/abis/erc20.json';
import { Erc20 } from '~/abis/types/Erc20';
import { useContract } from './useContract';

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
