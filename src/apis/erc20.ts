import { ethers } from 'ethers';
import ERC20_ABI from '../abis/erc20';

export const getERC20Balance = async (
  userAddress: string,
  tokenAddress: string,
  chainId: number,
  provider: ethers.Provider
) => {
  try {
    let TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
    return await TokenContract.balanceOf(userAddress);
  } catch (e) {
    console.error(e);
  }
};
