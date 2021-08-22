import { Contract } from "web3-eth-contract";
import { ERC20, IERC20Permit, OhBank, OhForum, OhToken } from "@ohfinance/oh-web3-types";
import { MAX_UINT256 } from "utils/bigNumber";
import BigNumber from "bignumber.js";

// ERC20

export const approve = async (
  tokenContract: ERC20,
  spenderContract: Contract,
  account: string
) => {
  return tokenContract.methods
    .approve(spenderContract.options.address, MAX_UINT256.toString())
    .send({ from: account });
};

export const balanceOf = async (tokenContract: ERC20, account: string) => {
  return tokenContract.methods
    .balanceOf(account)
    .call();
};

// ERC20 Permit

// ...

// Token

export const delegate = async (
  tokenContract: OhToken,
  delegatee: string,
  account: string
) => {
  return tokenContract.methods
    .delegate(delegatee)
    .send({ from: account });
}

// Bank

export const deposit = async (
  bankContract: OhBank,
  amount: BigNumber,
  account: string
) => {
  return bankContract.methods
    .deposit(amount.toString())
    .send({ from: account });
};

export const withdraw = async (
  bankContract: OhBank,
  amount: BigNumber,
  account: string
) => {
  return bankContract.methods
    .withdraw(amount.toString())
    .send({ from: account });
};

// Forum

export const castVote = async (
  forumContract: OhForum,
  proposalId: number,
  support: boolean,
  account: string
) => {
  return forumContract.methods
    .castVote(proposalId, support)
    .send({ from: account })
}

export const propose = async (
  forumContract: OhForum,
  targets: string[],
  values: string[],
  signatures: string[],
  calldatas: string[],
  description: string,
  account: string
) => {
  return forumContract.methods
    .propose(
      targets, 
      values,
      signatures,
      calldatas,
      description
    )
    .send({ from: account })
}
