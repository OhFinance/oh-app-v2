import { Contract } from '@ethersproject/contracts';
import BigNumber from 'bignumber.js';

// faucet token mint
export const allocateTo = async (
  faucetContract: Contract,
  recipient: string,
  amount: BigNumber
) => {
  const tx = await faucetContract.allocateTo(recipient, amount.toString());
  const receipt = await tx.wait();
  return receipt.status;
};
