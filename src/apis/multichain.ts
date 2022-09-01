import { MULTICHAIN_ROUTER_ADDRESS } from '../constants/addresses';
import { ethers } from 'ethers';
import ERC20_ABI from '../abis/erc20';

export const approveRouter = async (
  userAddress: string,
  tokenAddress: string,
  chainId: number,
  provider: ethers.Provider
) => {
  try {
    let TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
    const balance = await TokenContract.balanceOf(userAddress);
    return await (await TokenContract.approve(MULTICHAIN_ROUTER_ADDRESS[chainId], balance)).wait();
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
    let TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
    const allowance = await TokenContract.allowance(
      userAddress,
      MULTICHAIN_ROUTER_ADDRESS[chainId]
    );
    const balance = await TokenContract.balanceOf(userAddress);
    return allowance.gt(balance);
  } catch (e) {
    console.error(e);
  }
};
