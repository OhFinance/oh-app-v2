import { constructSameAddressMap } from 'utilities/constructSameAddressMap';
import { SupportedChainId } from './chains';
type AddressMap = { [chainId: number]: string };

export const MASTER_OH_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x7585eCC8267f1b32F3E4D057C1eE9016f043D4a9',
  [SupportedChainId.GOERLI]: '0xbc257221440DF4eCE3B17cb26cf8f763C248f178',
};

export const VEOH_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0xee661c2ab32bacb90418ad2ccf413e11994f5072',
  [SupportedChainId.GOERLI]: '0xA0c4F57fc408F34973075352E75D6Fa18c9155e9',
};

export const OH_ADDRESS: AddressMap = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0x16ba8Efe847EBDFef99d399902ec29397D403C30',
  [SupportedChainId.RINKEBY]: '0x6b461A994d76d8248a6B439D4a19cDfd821409eE',
  [SupportedChainId.GOERLI]: '0x6b461A994d76d8248a6B439D4a19cDfd821409eE',
  [SupportedChainId.KOVAN]: '0x6b461A994d76d8248a6B439D4a19cDfd821409eE',
  [SupportedChainId.AVALANCHE]: '0x937E077aBaEA52d3abf879c9b9d3f2eBd15BAA21',
};

export const MULTICALL_CONTRACT_ADDRESS: AddressMap = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [SupportedChainId.AVALANCHE]: '0x4934200FA0bCaa98e864F173c6e87899F7133856',
  [SupportedChainId.METIS]: '0x86f3EFDd4108f46C94f1BD23d57Ad2Cbe552eDaf',
  [SupportedChainId.MOONRIVER]: '0x310B1a441F02cA928BcF861a31b86C8092838095',
  [SupportedChainId.KOVAN]: '0x7f4c2431b4db2ce9ee2f994064a8840ba614bcec',
  [SupportedChainId.RINKEBY]: '0xb57aeb9c0c7e0fd39acdbf45fdab26341419a1fd',
};

export const USDC_ADDRESS: AddressMap = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  [SupportedChainId.RINKEBY]: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  [SupportedChainId.MOONRIVER]: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
  [SupportedChainId.KOVAN]: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede', // compound usdc
  [SupportedChainId.AVALANCHE]: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // usdc.e
};

export const OH_USDC_BANK = {
  [SupportedChainId.ETHEREUM_MAINNET]: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
  [SupportedChainId.RINKEBY]: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
  [SupportedChainId.MOONRIVER]: '0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A',
  [SupportedChainId.KOVAN]: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52', // compound usdc
  [SupportedChainId.AVALANCHE]: '0x8B1Be96dc17875ee01cC1984e389507Bb227CaAB', // usdc.e
};

// note: double check the rinkeby addresses
export const USDT_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD',
  [SupportedChainId.ETHEREUM_MAINNET]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  [SupportedChainId.MOONRIVER]: '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
  [SupportedChainId.METIS]: '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
  [SupportedChainId.AVALANCHE]: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
};

export const DAI_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x95b58a6Bff3D14B7DB2f5cb5F0Ad413DC2940658',
  [SupportedChainId.ETHEREUM_MAINNET]: '0x6b175474e89094c44da98b954eedeac495271d0f',
  [SupportedChainId.MOONRIVER]: '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844',
  [SupportedChainId.METIS]: '0x4651b38e7ec14bb3db731369bfe5b08f2466bd0a',
  [SupportedChainId.AVALANCHE]: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
};

export const OH_USDT_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x132CFc9F2f5Ce678730D97fd06053940CC1a9B15',
};

const V2_FACTORY_ADDRESS = '';

export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS);
