import MULTICALL_INTERFACE from '~/constants/abis/multicall';
import { MULTICALL_CONTRACT_ADDRESS } from '~/constants/addresses';
import { useContract } from './useContract';

export function useMulticall2Contract() {
  return useContract(MULTICALL_CONTRACT_ADDRESS, MULTICALL_INTERFACE, false);
}
