import { NetworkRouter, Networks } from 'config/constants/networks';

export const getBlockExplorerUrl = (chainId: number) => {
  return Networks[chainId].blockExplorerUrls[0];
};

export const getSwapRouterUrl = (chainId: number) => {
  return NetworkRouter[chainId];
};
