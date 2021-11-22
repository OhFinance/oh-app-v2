import { useERC20Contract } from './useContract';
import { useSingleCallResult } from '../state/multicall/hooks';
import BigNumber from 'bignumber.js';

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useTotalSupply(address?: string) {
  const contract = useERC20Contract(address);

  const totalSupply = useSingleCallResult(contract, 'totalSupply')?.result?.[0];

  return address && totalSupply ? new BigNumber(totalSupply.toString()) : undefined;
}

export default useTotalSupply;
