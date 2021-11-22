import { ethers } from 'ethers';

// Array of available nodes to connect to
export const nodes = {
  1: process.env.REACT_APP_MAINNET_NODE_URL ?? 'https://mainnet.eth.aragon.network/',
  4: process.env.REACT_APP_RINKEBY_NODE_URL ?? 'https://rinkeby.eth.aragon.network/',
  42: process.env.REACT_APP_KOVAN_NODE_URL ?? 'https://kovan.eth.aragon.network/',
} as Record<number, string>;

/* Fallback RPC Endpoint if no web3 connection, defaults to mainnet */
export const getDefaultProvider = (chainId?: number) =>
  new ethers.providers.JsonRpcProvider(nodes[chainId ?? 1]);
