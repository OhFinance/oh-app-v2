import ABI from '~/abis/multicall.json';
import { Multicall } from '~/abis/types';
import { MULTICALL_CONTRACT_ADDRESS } from '~/constants/addresses';
import { useContract } from './useContract';

export function useMulticall2Contract() {
  return useContract<Multicall>(MULTICALL_CONTRACT_ADDRESS, ABI, false) as Multicall;
}
