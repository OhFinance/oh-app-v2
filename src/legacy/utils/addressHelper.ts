import contracts from 'config/constants/contracts';
import tokens from 'config/constants/tokens';
import { Address } from 'config/constants/types';

// token addresses

export const getOhUsdcAddress = (): Address => {
  return tokens.ohUsdc.address ?? {};
};

export const getTokenAddress = (): Address => {
  return tokens.ohToken.address ?? {};
};

export const getUsdcAddress = (): Address => {
  return tokens.usdc.address ?? {};
};

// contract addresses

export const getForumAddress = (): Address => {
  return contracts.forum;
};

export const getGovernorAddress = (): Address => {
  return contracts.governor;
};

export const getLiquidatorAddress = (): Address => {
  return contracts.liquidator;
};

export const getManagerAddress = (): Address => {
  return contracts.manager;
};

export const getVestingAddress = (): Address => {
  return contracts.vesting;
};
