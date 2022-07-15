import { Token } from '@uniswap/sdk-core';
import { MASTER_OH_ADDRESS } from 'constants/addresses';
import { OH, VeOH } from 'constants/tokens';
import { BigNumber, ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import ERC20_ABI from '~/abis/erc20.json';
import MASTER_OH_ABI from '../abis/master_oh.json';
import ohABI from '../abis/oh_token.json';
import veOHABI from '../abis/ve_oh.json';
import { useContract } from './contracts/useContract';
import { useActiveWeb3React } from './web3';

export const useOHBalance = () => {
  const { chainId = 4, account } = useActiveWeb3React();
  const [balance, setBalance] = useState<number>(0);
  const ohToken = OH[chainId];
  const ohContract = useContract(ohToken.address, ohABI);
  useEffect(() => {
    ohContract?.functions
      .balanceOf(account)
      .then(([balance]) => setBalance(+ethers.utils.formatEther(balance)));
  }, [account, ohContract]);
  return balance;
};

export const useVeOHBalance = () => {
  const { chainId = 4, account } = useActiveWeb3React();
  const [balance, setBalance] = useState<number>(0);
  const veOHToken = VeOH[chainId];
  const veOHContract = useContract(veOHToken.address, veOHABI);
  useEffect(() => {
    veOHContract?.functions
      .balanceOf(account)
      .then(([balance]) => setBalance(+ethers.utils.formatEther(balance)));
  }, [account, veOHContract]);
  return balance;
};

export const useOHStaked = () => {
  const { account, chainId } = useActiveWeb3React();
  const [balance, setBalance] = useState<number>(0);
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);
  useEffect(() => {
    veOHContract.functions
      .getStakedOh(account)
      .then(([balance]) => setBalance(+ethers.utils.formatEther(balance)));
  }, [account, veOHContract]);
  return balance;
};

export const useInvestedBalance = (token: Token) => {
  const { chainId = 4 } = useActiveWeb3React();
  const tokenContract = useContract(token.address, ERC20_ABI);
  const [supply, setSupply] = useState<number>(0);
  useEffect(() => {
    tokenContract?.functions
      .balanceOf(MASTER_OH_ADDRESS[chainId])
      .then(([supply]) => setSupply(+ethers.utils.formatUnits(supply, token.decimals)));
  }, [chainId, token, tokenContract]);
  return supply;
};

export const useConfirmOHStake = () => {
  const { chainId } = useActiveWeb3React();
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);
  const ohToken = OH[chainId];
  const ohContract = useContract(ohToken.address, ohABI);

  const [loading, setLoading] = useState(false);
  const confirmStake = useCallback(
    async (amount: string) => {
      setLoading(true);
      try {
        const value = ethers.utils.parseEther(amount);
        const tx = await ohContract.functions.approve(veOH.address, value);
        await tx.wait();
        await veOHContract.functions.deposit(value);
      } finally {
        setLoading(false);
      }
    },
    [ohContract, veOH.address, veOHContract]
  );

  return { loading, confirmStake };
};

export const useOHBoostStats = () => {
  const { chainId = 4 } = useActiveWeb3React();
  const [veOHSupply, setVeOHSupply] = useState<number>(0);
  const [ohSupply, setOHSupply] = useState<number>(0);
  const [ohStaked, setOHStaked] = useState<number>(0);
  const [veOHRate, setVeOHRate] = useState<number>(0);
  const veOH = VeOH[chainId];
  const veOHContract = useContract(veOH.address, veOHABI);
  const ohToken = OH[chainId];
  const ohContract = useContract(ohToken.address, ohABI);

  useEffect(() => {
    ohContract?.functions
      .totalSupply()
      .then(([totalSupply]) => setOHSupply(+ethers.utils.formatEther(totalSupply)));
    ohContract?.functions
      .balanceOf(veOH.address)
      .then(([balance]) => setOHStaked(+ethers.utils.formatEther(balance)));
    veOHContract?.functions
      .totalSupply()
      .then(([totalSupply]) => setVeOHSupply(+ethers.utils.formatEther(totalSupply)));
    veOHContract?.functions
      .generationRate()
      .then(([rate]) => setVeOHRate(+ethers.utils.formatEther(rate)));
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
      .then(([balance]) => setBalance(+ethers.utils.formatUnits(balance, token.decimals)));
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
  useEffect(() => {
    masterContract?.functions
      .dilutingPartition()
      .then(([partition]) => setDilutingPartition(partition));
    masterContract?.functions.ohPerSec().then(([rate]) => setOhPerSecond(rate));
    masterContract?.functions.totalAllocPoint().then(([point]) => setTotalAlloc(point));
    masterContract?.functions.poolInfo(pid).then(console.log);
    masterContract?.functions
      .poolInfo(pid)
      .then(({ allocPoint }) => setPoolAllocPoints(allocPoint));
  }, [masterContract, pid]);

  return { dilutingPartition, ohPerSecond, totalAlloc, poolAllocPoints };
};
