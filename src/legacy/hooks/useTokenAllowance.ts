import { useMemo } from 'react';
import { useERC20Contract } from './useContract';
import { useSingleCallResult } from 'state/multicall/hooks';
import BigNumber from 'bignumber.js';

export const useTokenAllowance = (tokenAddress?: string, owner?: string, spender?: string) => {
  const contract = useERC20Contract(tokenAddress);
  const inputs = useMemo(() => [owner, spender], [owner, spender]);
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result;

  return useMemo(
    () => (tokenAddress && allowance ? new BigNumber(allowance.toString()) : undefined),
    [tokenAddress, allowance]
  );
};
