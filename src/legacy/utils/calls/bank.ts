import { Contract } from '@ethersproject/contracts';
import BigNumber from 'bignumber.js';

export const depositBank = async (bankContract: Contract, amount: BigNumber) => {
  const tx = await bankContract.deposit(amount.toString());
  // const receipt = await tx.wait();
  // return receipt.status;
  return tx.hash;
};

export const withdrawBank = async (bankContract: Contract, amount: BigNumber) => {
  const tx = await bankContract.withdraw(amount.toString());
  const receipt = await tx.wait();
  return receipt.status;
};
