import { ethers } from 'ethers';

import MasterOHABI from '../abis/master_oh.json';
import ERC20ABI from '../abis/erc20.json';
import { MASTER_OH_ADDRESS, VEOH_ADDRESS } from '../constants/addresses';
import { getOhTokenPrice } from '~/services/ohTokenPriceService';

export const deposit = async (
  poolID: number,
  amount: number,
  chainID: number,
  provider: ethers.Provider
) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider.getSigner());
  return await (await contract.deposit(poolID, amount)).wait();
};

export const withdraw = async (
  poolID: number,
  amount: number,
  chainID: number,
  provider: ethers.Provider
) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider.getSigner());
  return await (await contract.withdraw(poolID, amount)).wait();
};

export interface Pool {
  lpToken: string;
  allocPoint: number;
  lastRewardTimestamp: number;
  accOhPerShare: number;
  rewarder: string;
  sumOfFactors: number;
  accOhPerFactorShare: number;
  tvl?: string;
  tokenSymbol?: string;
  pid?: number;
  decimals?: number;
}

export const getPoolInfo = async (chainID: number, provider: ethers.Provider) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);

  const poolLength = await contract.poolLength();
  let pools: Pool[] = [];
  for (let i = 0; i < poolLength; i++) {
    const pool: Pool = await contract.poolInfo(i);

    const token = new ethers.Contract(pool.lpToken, ERC20ABI, provider);
    const decimals = await token.decimals();
    const _tvl = await token.balanceOf(MASTER_OH_ADDRESS[chainID]);
    const tvl = ethers.utils.formatUnits(_tvl, decimals);

    const symbol = await token.symbol();

    pool = { ...pool, tvl, symbol, pid: i, decimals };
    pools.push(pool);
  }

  return pools;
};

export interface AprInfo {
  baseApr: number;
  myBoostedApr?: number;
  medianBoostedApr: number;
}

export const getAprInfo = async (
  userAddress: string,
  poolID: number,
  chainID: number,
  provider: ethers.Provider
) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);

  const pool = await contract.poolInfo(poolID);
  const allocFactor = pool.allocPoint / (await contract.totalAllocPoint());

  const token = new ethers.Contract(pool.lpToken, ERC20ABI, provider);
  const decimals = await token.decimals();
  const tvl = ethers.utils.formatUnits(await token.balanceOf(MASTER_OH_ADDRESS[chainID]), decimals);
  if (tvl < 1) {
    tvl = 1;
  }

  const dilutingPartition = await contract.dilutingPartition();
  const ohPerSec = ethers.utils.formatEther(await contract.ohPerSec());
  const ohTokenPrice = await getOhTokenPrice();
  const oneYearBaseRewardsValue =
    (ohPerSec * 60 * 60 * 24 * 365 * ohTokenPrice * allocFactor * dilutingPartition) / 1000;
  const baseApr = (oneYearBaseRewardsValue * 100) / tvl;

  const nonDilutingPartition = 1000 - dilutingPartition;
  //const medianBoostedApr = (ohPerSec * 60 * 60 * 24 * 365 * ohTokenPrice * allocFactor * 100) / tvl;
  const medianBoostedApr = 0;

  if (userAddress) {
    const factor = pool.sumOfFactors.eq('0')
      ? 1
      : (await contract.userInfo(poolID, userAddress)).factor;
    const sumOfFactors = pool.sumOfFactors.gte('1') ? pool.sumOfFactors : 1;
    const oneYearBoostedRewardsValue =
      (ohPerSec * 60 * 60 * 24 * 365 * ohTokenPrice * allocFactor * nonDilutingPartition * factor) /
      (sumOfFactors * 1000);
    const myBoostedApr = ((oneYearBaseRewardsValue + oneYearBoostedRewardsValue) * 100) / tvl;
    return {
      baseApr: baseApr.toFixed(2),
      medianBoostedApr: medianBoostedApr.toFixed(2),
      myBoostedApr: myBoostedApr.toFixed(2),
    };
  } else {
    return { baseApr: baseApr.toFixed(2), medianBoostedApr: medianBoostedApr.toFixed(2) };
  }
};

export const getUserInfo = async (
  userAddress: string,
  pid: number,
  chainID: number,
  provider: ethers.Provider
) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);

  return await contract.userInfo(pid, userAddress);
};

export const getPendingRewards = async (
  userAddress: string,
  pid: number,
  chainID: number,
  provider: ethers.Provider
) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);

  return await contract.pendingTokens(pid, userAddress);
};

export const getUserBal = async (
  userAddress: string,
  tokenAddress: string,
  chainID: number,
  provider: ethers.Provider
) => {
  let token = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  const bal = await token.balanceOf(userAddress);
  return bal;
};

export const isTokenApproved = async (
  userAddress: string,
  tokenAddress: string,
  chainID: number,
  provider: ethers.Provider
) => {
  let token = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  const bal = await token.balanceOf(userAddress);
  const allowance = await token.allowance(userAddress, MASTER_OH_ADDRESS[chainID]);
  return allowance.gt(bal);
};

export const approveToken = async (
  userAddress: string,
  tokenAddress: string,
  chainID: number,
  provider: ethers.Provider
) => {
  let token = new ethers.Contract(tokenAddress, ERC20ABI, provider.getSigner());

  return await (
    await token.approve(MASTER_OH_ADDRESS[chainID], ethers.constants.MaxUint256)
  ).wait();
};
