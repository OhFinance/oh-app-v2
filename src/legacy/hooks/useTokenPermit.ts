import BigNumber from 'bignumber.js';
import { useERC20PermitContract } from './useContract';
import { useWeb3 } from './useWeb3';

export const useTokenPermit = (
  tokenAddress?: string,
  spender?: string,
  amountToApprove?: BigNumber
) => {
  const { account, chainId } = useWeb3();
  const tokenContract = useERC20PermitContract(tokenAddress);
};
