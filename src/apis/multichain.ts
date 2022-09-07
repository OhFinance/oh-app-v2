import { MULTICHAIN_ROUTER_ADDRESS } from '../constants/addresses';
import { ethers } from 'ethers';
import ERC20_ABI from '../abis/erc20';
import ROUTER_ABI from '../abis/multichain_router';

export const approveRouter = async (
  tokenAddress: string,
  routerAddress: string,
  provider: ethers.Provider
) => {
  const TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
  return await (await TokenContract.approve(routerAddress, ethers.constants.MaxUint256)).wait();
};

export const isRouterApproved = async (
  userAddress: string,
  tokenAddress: string,
  routerAddress: string,
  provider: ethers.Provider
) => {
  try {
    const TokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider.getSigner());
    const allowance = await TokenContract.allowance(userAddress, routerAddress);
    const balance = await TokenContract.balanceOf(userAddress);
    return allowance.gte(balance) && allowance.gt('0');
  } catch (e) {
    console.error(e);
  }
};

export const anySwapOutUnderlying = async (
  underlyingAddress: string,
  recipientAddress: string,
  amount: ethers.BigNumber,
  routerAddress: string,
  toChainId: number,
  provider: ethers.Provider
) => {
  const data = await fetch('https://bridgeapi.anyswap.exchange/v4/tokenlistv4/1');
  const tokenList = await data.json();
  const tokenInfo = tokenList[`evm${underlyingAddress.toLowerCase()}`];
  const destChain = tokenInfo.destChains[toChainId];
  const destToken = destChain[Object.keys(destChain)[0]];
  const anyTokenAddress = destToken.fromanytoken.address;

  const RouterContract = new ethers.Contract(routerAddress, ROUTER_ABI, provider.getSigner());
  return await RouterContract.anySwapOutUnderlying(
    anyTokenAddress,
    recipientAddress,
    amount,
    toChainId
  );
};

export const swapout = async (
  recipientAddress: string,
  amount: ethers.BigNumber,
  routerAddress: string,
  provider: ethers.Provider
) => {
  const RouterContract = new ethers.Contract(routerAddress, ROUTER_ABI, provider.getSigner());
  return await RouterContract.Swapout(amount, recipientAddress);
};
