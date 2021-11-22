import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useSingleCallResult } from 'state/multicall/hooks';
import { useERC20Contract } from './useContract';

export const useTokenAllowance = (tokenAddress?: string, owner?: string, spender?: string) => {
  const contract = useERC20Contract(tokenAddress);
  const inputs = useMemo(() => [owner, spender], [owner, spender]);
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result;

  return useMemo(
    () => (tokenAddress && allowance ? new BigNumber(allowance.toString()) : undefined),
    [tokenAddress, allowance]
  );
};
