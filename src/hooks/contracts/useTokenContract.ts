import { Contract } from '@ethersproject/contracts';
import ERC20_ABI from '~/abis/erc20.json';
import ERC20_BYTES32_ABI from '~/abis/erc20_bytes32.json';
import { Erc20 } from '~/abis/types/Erc20';
import { useContract } from './useContract';

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
