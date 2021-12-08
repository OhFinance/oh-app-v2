import { SupportedChainId } from './chains';
type AddressMap = { [chainId: number]: string };

export const OH_ADDRESS: AddressMap = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0x16ba8Efe847EBDFef99d399902ec29397D403C30',
  [SupportedChainId.RINKEBY]: '0x6b461A994d76d8248a6B439D4a19cDfd821409eE',
  [SupportedChainId.KOVAN]: '0x6b461A994d76d8248a6B439D4a19cDfd821409eE',
  [SupportedChainId.AVALANCHE]: '0x937E077aBaEA52d3abf879c9b9d3f2eBd15BAA21',
};

export const MULTICALL_CONTRACT_ADDRESS: AddressMap = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [SupportedChainId.AVALANCHE]: '0x4934200FA0bCaa98e864F173c6e87899F7133856',
  [SupportedChainId.KOVAN]: '0x7f4c2431b4db2ce9ee2f994064a8840ba614bcec',
  [SupportedChainId.RINKEBY]: '0xb57aeb9c0c7e0fd39acdbf45fdab26341419a1fd',
};

export const USDC_ADDRESS: AddressMap = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [SupportedChainId.RINKEBY]: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  [SupportedChainId.KOVAN]: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede', // compound usdc
  [SupportedChainId.AVALANCHE]: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // usdc.e
};

export const OH_USDC_BANK = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
  [SupportedChainId.RINKEBY]: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
  [SupportedChainId.KOVAN]: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52', // compound usdc
  [SupportedChainId.AVALANCHE]: '0x8B1Be96dc17875ee01cC1984e389507Bb227CaAB', // usdc.e
};
