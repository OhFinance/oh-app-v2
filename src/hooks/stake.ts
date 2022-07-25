import { Token } from '@uniswap/sdk-core';
import { MASTER_OH_ADDRESS } from 'constants/addresses';
import { OH, VeOH } from 'constants/tokens';
import { BigNumber } from 'ethers';
import { formatEther, formatUnits, parseEther, parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { scalePrice, sqrt } from 'utilities/numberUtilities';
import ERC20_ABI from '~/abis/erc20.json';
import MASTER_OH_ABI from '../abis/master_oh.json';
import ohABI from '../abis/oh_token.json';
import veOHABI from '../abis/ve_oh.json';
import { usePriceStore } from '../stores/usePriceStore';
import { useContract } from './contracts/useContract';
import { useActiveWeb3React } from './web3';

export const useOHBalance = () => {
  const { chainId = 4, account } = useActiveWeb3React();
  const [balance, setBalance] = useState<number>(0);
  const ohToken = OH[chainId];
  const ohContract = useContract(ohToken.address, ohABI);
  const getBalance = useCallback(() => {
    ohContract?.functions.balanceOf(account).then(([balance]) => setBalance(+formatEther(balance)));
  }, [account, ohContract]);
  useEffect(getBalance, [getBalance]);
  useEffect(() => {
    ohContract?.removeAllListeners();
    ohContract?.on('Transfer', getBalance);
    return () => {
      ohContract?.removeAllListeners();
    };
  }, [getBalance, ohContract]);
  return balance;
};

export const useVeOHBalance = () => {
  const { chainId = 4, account } = useActiveWeb3React();
  const [balance, setBalance] = useState<number>(0);
  const veOHToken = VeOH[chainId];
  const veOHContract = useContract(veOHToken.address, veOHABI);

  const getBalance = useCallback(() => {
    veOHContract?.functions
      .balanceOf(account)
      .then(([balance]) => setBalance(+formatEther(balance)));
  }, [account, veOHContract?.functions]);
  useEffect(getBalance, [getBalance]);
  return { veOHBalance: balance, getBalance };
};

export const useVeOHClaimable = () => {
  const { chainId = 4, account } = useActiveWeb3React();
  const [balance, setBalance] = useState<number>(0);
  const veOHToken = VeOH[chainId];
  const veOHContract = useContract(veOHToken.address, veOHABI);

  const getClaimable = useCallback(() => {
    veOHContract?.functions
      .claimable(account)
      .then(([balance]) => setBalance(+formatEther(balance)));
  }, [account, veOHContract?.functions]);
  useEffect(getClaimable, [getClaimable]);
  return { veOHClaimable: balance, getClaimable };
};

export const useClaimVeOH = () => {
  const { chainId = 4, account } = useActiveWeb3React();
  const veOHToken = VeOH[chainId];
  const veOHContract = useContract(veOHToken.address, veOHABI);

  const [loading, setLoading] = useState(false);

  const claimVeOH = useCallback(async () => {
    setLoading(true);
    try {
      const tx = await veOHContract?.functions.claim();
      await tx.wait();
    } finally {
      setLoading(false);
    }
  }, [veOHContract]);
  return { claimVeOH, loading };
};

export const useOHStaked = () => {
  const { account, chainId = 4 } = useActiveWeb3React();
  const [staked, setStaked] = useState<number>(0);
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);
  const getStaked = useCallback(() => {
    veOHContract?.functions
      .getStakedOh(account)
      .then(([balance]) => setStaked(+formatEther(balance)));
  }, [account, veOHContract]);

  useEffect(getStaked, [getStaked]);
  return { staked, getStaked };
};

export const useInvestedBalance = (token: Token) => {
  const { chainId = 4 } = useActiveWeb3React();
  const tokenContract = useContract(token.address, ERC20_ABI);
  const [supply, setSupply] = useState<number>(0);
  useEffect(() => {
    tokenContract?.functions
      .balanceOf(MASTER_OH_ADDRESS[chainId])
      .then(([supply]) => setSupply(+formatUnits(supply, token.decimals)));
  }, [chainId, token, tokenContract]);
  return supply;
};

export const useConfirmOHStake = () => {
  const { chainId } = useActiveWeb3React();
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);
  const ohToken = OH[chainId];
  const ohContract = useContract(ohToken.address, ohABI);
  const [approved, setApproved] = useState<boolean>(false);
  const [value, setValue] = useState<BigNumber>(parseEther('0'));

  const [loading, setLoading] = useState(false);
  const confirmStake = useCallback(async () => {
    setLoading(true);
    try {
      const tx = await veOHContract.functions.deposit(value);
      await tx.wait();
      setApproved(false);
    } finally {
      setLoading(false);
    }
  }, [value, veOHContract]);

  const approveStake = useCallback(
    async (amount: string) => {
      setLoading(true);
      try {
        const value = parseEther(amount);
        const tx = await ohContract.functions.approve(veOH.address, value);
        await tx.wait();
        setApproved(true);
        setValue(value);
      } finally {
        setLoading(false);
      }
    },
    [ohContract, veOH]
  );

  return { loading, confirmStake, approveStake, approved };
};

export const useWithdrawOHStake = () => {
  const { chainId } = useActiveWeb3React();
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);

  const [loading, setLoading] = useState(false);
  const withdrawStake = useCallback(
    async (amount: string) => {
      setLoading(true);
      try {
        const tx = await veOHContract.functions.withdraw(parseEther(amount));
        await tx.wait();
      } finally {
        setLoading(false);
      }
    },
    [veOHContract]
  );

  return { loading, withdrawStake };
};

export const useOHBoostStats = () => {
  const { chainId = 4 } = useActiveWeb3React();
  const [veOHSupply, setVeOHSupply] = useState<number>(0);
  const [ohSupply, setOHSupply] = useState<number>(0);
  const [ohStaked, setOHStaked] = useState<number>(0);
  const [veOHRate, setVeOHRate] = useState<BigNumber>(BigNumber.from(0));
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);
  const ohToken = OH[chainId];
  const ohContract = useContract(ohToken.address, ohABI);

  useEffect(() => {
    ohContract?.functions
      .totalSupply()
      .then(([totalSupply]) => setOHSupply(+formatEther(totalSupply)));
    ohContract?.functions
      .balanceOf(veOH.address)
      .then(([balance]) => setOHStaked(+formatEther(balance)));
    veOHContract?.functions
      .totalSupply()
      .then(([totalSupply]) => setVeOHSupply(+formatEther(totalSupply)));
    veOHContract?.functions.generationRate().then(([rate]) => setVeOHRate(rate));
  }, [veOHContract, ohContract, veOH.address]);
  return { veOHSupply, ohSupply, ohStaked, veOHRate };
};

export const useProxyTokenBalance = (token: Token) => {
  const { account } = useActiveWeb3React();
  const tokenContract = useContract(token.address, ERC20_ABI);
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    tokenContract?.functions
      .balanceOf(account)
      .then(([balance]) => setBalance(+formatUnits(balance, token.decimals)));
  }, [account, token, tokenContract]);
  return balance;
};

export const usePoolInfo = (pid: number) => {
  const { chainId = 4 } = useActiveWeb3React();
  const masterContract = useContract(MASTER_OH_ADDRESS[chainId], MASTER_OH_ABI);
  const zero = BigNumber.from(0);
  const [dilutingPartition, setDilutingPartition] = useState(zero);
  const [ohPerSecond, setOhPerSecond] = useState(zero);
  const [totalAlloc, setTotalAlloc] = useState(zero);
  const [poolAllocPoints, setPoolAllocPoints] = useState(zero);
  const [poolInfo, setPoolInfo] = useState({});
  const [sumOfFactors, setsumOfFactors] = useState(zero);

  useEffect(() => {
    masterContract?.functions
      .dilutingPartition()
      .then(([partition]) => setDilutingPartition(partition));
    masterContract?.functions.ohPerSec().then(([rate]) => setOhPerSecond(rate));
    masterContract?.functions.totalAllocPoint().then(([point]) => setTotalAlloc(point));
    masterContract?.functions.poolInfo([pid]).then(([info]) => setPoolInfo(info));
    masterContract?.functions
      .poolInfo([pid])
      .then(({ sumOfFactors }) => setsumOfFactors(sumOfFactors));
    masterContract?.functions
      .poolInfo([pid])
      .then(({ allocPoint }) => setPoolAllocPoints(allocPoint));
  }, [masterContract, pid]);

  return { dilutingPartition, ohPerSecond, totalAlloc, poolAllocPoints, poolInfo, sumOfFactors };
};

export const useUserInfo = (pid: Number, account?: string) => {
  const [userInfo, setUserInfo] = useState({
    amount: BigNumber.from(0),
    factor: BigNumber.from(0),
  });
  const { chainId = 4 } = useActiveWeb3React();
  const masterContract = useContract(MASTER_OH_ADDRESS[chainId], MASTER_OH_ABI);
  useEffect(() => {
    masterContract?.functions
      .userInfo(pid, account)
      .then(({ amount, factor }) => setUserInfo({ amount, factor }));
  }, [masterContract, pid, account]);
  return userInfo;
};

export const useBaseAPR = (pid: number, token: Token) => {
  const { dilutingPartition, ohPerSecond, totalAlloc, poolAllocPoints } = usePoolInfo(pid);
  const totalStaked = useInvestedBalance(token);
  const { price } = usePriceStore();
  // Token USD Price scaled to token decimals
  const scaledPrice = scalePrice(price, token.decimals);
  try {
    const annualOH = ohPerSecond.mul(60 * 60 * 24 * 365);
    const annualUSDEstimate = annualOH.mul(scaledPrice);
    const apr = annualUSDEstimate
      // OH allocation Ratio for this pool
      .mul(poolAllocPoints)
      .div(totalAlloc)
      // Diluting Ratio (dedicated for token based APY)
      .mul(dilutingPartition)
      .div(1000)
      // Generated OH to be distributed equally to total staked tokens
      // Division will also remove scale factor from the price
      .div(parseUnits(totalStaked.toString(), token.decimals))
      // Convert to %age (WEI Units)
      .mul(100);
    return apr;
  } catch {
    return BigNumber.from(0);
  }
};

export const useBoostedAPR = (pid: number, token: Token) => {
  const { dilutingPartition, ohPerSecond, sumOfFactors, poolAllocPoints, totalAlloc } =
    usePoolInfo(pid);
  const { account } = useActiveWeb3React();
  const userInfo = useUserInfo(pid, account);

  const { price } = usePriceStore();
  // Token USD Price scaled to token decimals
  const scaledPrice = scalePrice(price, token.decimals);

  try {
    const annualOH = ohPerSecond.mul(60 * 60 * 24 * 365);
    const annualUSDEstimate = annualOH.mul(scaledPrice);
    const apr = annualUSDEstimate
      // OH allocation Ratio for this pool
      .mul(poolAllocPoints)
      .div(totalAlloc)
      // Non-Diluting Ratio (dedicated for veOH based APY)
      .mul(BigNumber.from(1_000).sub(dilutingPartition))
      .div(1000)
      // Current user ratio for this pool
      .mul(userInfo.factor)
      .div(sumOfFactors)
      // User deposited tokens
      // Division will also remove scale factor from the price
      .div(userInfo.amount)
      // Convert to %age (WEI Units)
      .mul(100);
    return apr;
  } catch {
    return BigNumber.from(0);
  }
};

export const useEstimatedAPR = (
  pid: number,
  token: Token,
  stakedAmount: string,
  veOhAmount: BigNumber
) => {
  const { dilutingPartition, ohPerSecond, sumOfFactors, poolAllocPoints, totalAlloc } =
    usePoolInfo(pid);
  const { account } = useActiveWeb3React();
  const userInfo = useUserInfo(pid, account);
  const { price } = usePriceStore();
  // Token USD Price scaled to token decimals
  const scaledPrice = scalePrice(price, token.decimals);

  try {
    // Estimate user factor for these amounts
    const estimatedFactor = sqrt(parseUnits(stakedAmount || '0', token.decimals).mul(veOhAmount));
    // Estimate total distribution factor after user stake
    const estimatedSumOfFactors = sumOfFactors.sub(userInfo.factor).add(estimatedFactor);
    const annualOH = ohPerSecond.mul(60 * 60 * 24 * 365);
    const annualUSDEstimate = annualOH.mul(scaledPrice);
    const apr = annualUSDEstimate
      // OH allocation Ratio for this pool
      .mul(poolAllocPoints)
      .div(totalAlloc)
      // Non-Diluting Ratio (dedicated for veOH based APY)
      .mul(BigNumber.from(1_000).sub(dilutingPartition))
      .div(1000)
      // estimated user ratio for this pool
      .mul(estimatedFactor)
      .div(estimatedSumOfFactors)
      // User deposited tokens
      // Division will also remove scale factor from the price
      .div(stakedAmount)
      // Convert to %age (WEI Units)
      .mul(100);
    return apr;
  } catch {
    return BigNumber.from(0);
  }
};
