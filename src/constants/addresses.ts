import { SupportedChainId } from './chains';

export const MULTICALL_CONTRACT_ADDRESS: Record<SupportedChainId, string> = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0x5Cb02b71BC98DeFd595912109928207c8bB80B74',
  [SupportedChainId.AVALANCHE]: '0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A',
  [SupportedChainId.KOVAN]: '0x7f4c2431b4db2ce9ee2f994064a8840ba614bcec',
  [SupportedChainId.RINKEBY]: '0xb57aeb9c0c7e0fd39acdbf45fdab26341419a1fd',
};
