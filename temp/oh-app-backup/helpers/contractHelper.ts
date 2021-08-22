import Web3 from "web3";
import { AbiItem } from "web3-utils";
import web3NoAccount from "utils/web3-default";
import ERC20Abi from "@ohfinance/oh-web3-types/abi/ERC20.json";
import OhBankAbi from "@ohfinance/oh-web3-types/abi/OhBank.json";
import OhGovernorAbi from "@ohfinance/oh-web3-types/abi/OhGovernor.json";
import OhForumAbi from "@ohfinance/oh-web3-types/abi/OhForum.json";
import OhLiquidatorAbi from "@ohfinance/oh-web3-types/abi/OhLiquidator.json";
import OhManagerAbi from "@ohfinance/oh-web3-types/abi/OhManager.json";
import OhTimelockAbi from "@ohfinance/oh-web3-types/abi/OhTimelock.json";
import OhTokenAbi from "@ohfinance/oh-web3-types/abi/OhToken.json";
import { 
  ERC20, 
  OhBank,
  OhForum,
  OhGovernor,
  OhLiquidator,
  OhManager,
  OhTimelock,
  OhToken,
} from "@ohfinance/oh-web3-types";
import {
  BaseContract
} from '@ohfinance/oh-web3-types/types/types'
import { 
  getForumAddress, 
  getGovernorAddress, 
  getLiquidatorAddress, 
  getManagerAddress, 
  getTokenAddress, 
  getVestingAddress 
} from "./addressHelper";

function getContract<T extends BaseContract>(
  abi: any,
  address: string,
  web3?: Web3
): T {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi as AbiItem[], address) as BaseContract as T;
}

// ERC-20

export const getErc20Contract = (address: string, web3?: Web3) => {
  return getContract<ERC20>(ERC20Abi, address, web3);
};

// Oh! Finance

export const getBankContract = (address: string, web3?: Web3) => {
  return getContract<OhBank>(OhBankAbi, address, web3)
}

export const getGovernorContract = (web3?: Web3) => {
  return getContract<OhGovernor>(OhGovernorAbi, getGovernorAddress(), web3);
}

export const getForumContract = (web3?: Web3) => {
  return getContract<OhForum>(OhForumAbi, getForumAddress(), web3);
}

export const getLiquidatorContract = (web3?: Web3) => {
  return getContract<OhLiquidator>(OhLiquidatorAbi, getLiquidatorAddress(), web3);
}

export const getManagerContract = (web3?: Web3) => {
  return getContract<OhManager>(OhManagerAbi, getManagerAddress(), web3);
}

export const getTokenContract = (web3?: Web3) => {
  return getContract<OhToken>(OhTokenAbi, getTokenAddress(), web3);
};

export const getVestingContract = (web3?: Web3) => {
  return getContract<OhTimelock>(OhTimelockAbi, getVestingAddress(), web3);
};

