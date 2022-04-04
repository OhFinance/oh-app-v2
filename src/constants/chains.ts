const ethereumLogoUrl = '/img/chains/ethereum.png';
const avalancheLogoUrl = '/img/chains/avalanche.png';
const moonriverLogoUrl = '/img/chains/moonriver.svg';

export enum SupportedChainId {
  ETHEREUM_MAINNET = 1,
  RINKEBY = 4,
  KOVAN = 42,
  MOONRIVER = 1285,
  AVALANCHE = 43114,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.ETHEREUM_MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.KOVAN,
  SupportedChainId.MOONRIVER,
  SupportedChainId.AVALANCHE,
];

export const L1_CHAIN_IDS = [
  SupportedChainId.ETHEREUM_MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.KOVAN,
  SupportedChainId.MOONRIVER,
  SupportedChainId.AVALANCHE,
] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number;
  readonly docs: string;
  readonly explorer: string;
  readonly label: string;
  readonly logoUrl: string;
  readonly rpcUrls?: string[];
  readonly nativeCurrency?: {
    name: string; // 'Goerli ETH',
    symbol: string; // 'gorETH',
    decimals: number; //18,
  };
}

export type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {} & {
  readonly [chainId in SupportedL1ChainId]: L1ChainInfo;
};

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.AVALANCHE]: {
    blockWaitMsBeforeWarning: 600000,
    docs: 'https://docs.avax.network/',
    explorer: 'https://snowtrace.io/',
    label: 'Avalanche',
    logoUrl: avalancheLogoUrl,
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  },
  [SupportedChainId.MOONRIVER]: {
    blockWaitMsBeforeWarning: 600000,
    docs: 'https://docs.moonbeam.network/builders/get-started/networks/moonriver/',
    explorer: 'https://blockscout.moonriver.moonbeam.network/',
    label: 'Moonriver',
    logoUrl: moonriverLogoUrl,
    nativeCurrency: { name: 'MOVR', symbol: 'MOVR', decimals: 18 },
    rpcUrls: ['https://rpc.api.moonriver.moonbeam.network/'],
  },
  [SupportedChainId.ETHEREUM_MAINNET]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
    logoUrl: '',
    nativeCurrency: { name: 'Rinkeby ETH', symbol: 'rinkETH', decimals: 18 },
  },

  [SupportedChainId.KOVAN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
    logoUrl: '',
    nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
  },
};
