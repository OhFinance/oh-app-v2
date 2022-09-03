import { MULTICHAIN_ROUTER_ADDRESS } from '../constants/addresses';
import { ethers } from 'ethers';
import ERC20_ABI from '../abis/erc20';
import ROUTER_ABI from '../abis/multichain_router';

export const approveRouter = async (
  tokenAddress: string,
  chainId: number,
  provider: ethers.Provider
) => {
  try {
    const TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
    return await (
      await TokenContract.approve(MULTICHAIN_ROUTER_ADDRESS[chainId], ethers.constants.MaxUint256)
    ).wait();
  } catch (e) {
    console.error(e);
  }
};

export const isRouterApproved = async (
  userAddress: string,
  tokenAddress: string,
  chainId: number,
  provider: ethers.Provider
) => {
  try {
    const TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
    const allowance = await TokenContract.allowance(
      userAddress,
      MULTICHAIN_ROUTER_ADDRESS[chainId]
    );
    const balance = await TokenContract.balanceOf(userAddress);
    return allowance.gte(balance);
  } catch (e) {
    console.error(e);
  }
};

export const anySwapOutUnderlying = async (
  anyTokenAddress: string,
  recipientAddress: string,
  amount: ethers.BigNumber,
  fromChainId: number,
  toChainId: number,
  provider: ethers.Provider
) => {
  try {
    const RouterContract = new ethers.Contract(
      MULTICHAIN_ROUTER_ADDRESS[fromChainId],
      ROUTER_ABI,
      provider.getSigner()
    );
    return (
      await RouterContract.anySwapOutUnderlying(
        anyTokenAddress,
        recipientAddress,
        amount,
        toChainId
      )
    ).wait;
  } catch (e) {
    console.error(e);
  }
};
