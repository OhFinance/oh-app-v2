import { BigNumber, ethers } from 'ethers';

import { getOhTokenPrice } from '~/services/ohTokenPriceService';
import ERC20ABI from '../abis/erc20.json';
import MasterOHABI from '../abis/master_oh.json';
import RewarderABI from '../abis/rewarder.json';
import { MASTER_OH_ADDRESS } from '../constants/addresses';

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
    const myBoostedApr = (oneYearBoostedRewardsValue * 100) / tvl;
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
export const getAllowance = async (
  userAddress: string,
  tokenAddress: string,
  chainID: number,
  provider: ethers.Provider
) => {
  let token = new ethers.Contract(tokenAddress, ERC20ABI, provider);
  return await token.allowance(userAddress, MASTER_OH_ADDRESS[chainID]);
};
export const compareAllowance = async (
  testAmount: string,
  testDecimals: number,
  userAddress: string,
  tokenAddress: string,
  chainID: number,
  provider: ethers.Provider
): Promise<boolean> => {
  return ethers.utils
    .parseUnits(testAmount, testDecimals)
    .lte(await getAllowance(userAddress, tokenAddress, chainID, provider));
};

export const checkTokenAllowanceAndBalance = async (
  userAddress: string,
  tokenAddress: string,
  chainID: number,
  provider: ethers.Provider
) => {
  let token = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  const bal = await token.balanceOf(userAddress);
  const allowance = await token.allowance(userAddress, MASTER_OH_ADDRESS[chainID]);
  return allowance.gte(bal);
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

export const getRewardTokenInfo = async (chainID: number, provider: ethers.Provider) => {
  const contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);

  const rewardTokenAddress = await contract.oh();
  const rewardTokenContract = new ethers.Contract(rewardTokenAddress, ERC20ABI, provider);
  const rewardTokenSymbol = await rewardTokenContract.symbol();

  return { rewardTokenAddress, rewardTokenSymbol };
};

export const getSecondaryRewardInfo = async (
  userAddress: string,
  poolID: number,
  chainID: number,
  provider: ethers.Provider
) => {
  const contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);

  const pool = await contract.poolInfo(poolID);
  if (pool.rewarder === ethers.constants.AddressZero) {
    return {};
  }

  const rewarder = new ethers.Contract(pool.rewarder, RewarderABI, provider);

  const rewardTokenAddress = await rewarder.rewardToken();
  const rewardTokenContract = new ethers.Contract(rewardTokenAddress, ERC20ABI, provider);

  const rewardTokenSymbol = await rewardTokenContract.symbol();

  if (userAddress) {
    const rewardTokenAmount = await pendingTokens(userAddress);
    return { rewardTokenAddress, rewardTokenSymbol, rewardTokenAmount };
  } else {
    return { rewardTokenAddress, rewardTokenSymbol };
  }
};

export const getOhPerSec = async (
  chainID: number,
  provider: ethers.Provider
): Promise<BigNumber> => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);
  return await contract.ohPerSec();
};
export const useDialutingRepartition = async (chainID: number, provider: ethers.Provider) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);
  return await contract.dilutingPartition();
};
export const getTotalAdjustedAllocPoint = async (chainID: number, provider: ethers.Provider) => {
  let contract = new ethers.Contract(MASTER_OH_ADDRESS[chainID], MasterOHABI, provider);
  return await contract.totalAllocPoint();
};
