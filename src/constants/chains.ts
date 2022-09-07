const ethereumLogoUrl = '/img/chains/ethereum.png';
const avalancheLogoUrl = '/img/chains/avalanche.png';
const metisLogoUrl = '/img/chains/metis.png';
const moonriverLogoUrl = '/img/chains/moonriver.svg';

export enum SupportedChainId {
  ETHEREUM_MAINNET = 1,
  RINKEBY = 4,
  KOVAN = 42,
  METIS = 1088,
  MOONRIVER = 1285,
  AVALANCHE = 43114,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.ETHEREUM_MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.KOVAN,
  SupportedChainId.METIS,
  SupportedChainId.MOONRIVER,
  SupportedChainId.AVALANCHE,
];

export const L1_CHAIN_IDS = [
  SupportedChainId.ETHEREUM_MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.KOVAN,
  SupportedChainId.METIS,
  SupportedChainId.MOONRIVER,
  SupportedChainId.AVALANCHE,
] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export interface L1ChainInfo {
  readonly name: string;
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
    name: 'Avalanche',
    blockWaitMsBeforeWarning: 600000,
    docs: 'https://docs.avax.network/',
    explorer: 'https://snowtrace.io/',
    label: 'Avalanche',
    logoUrl: avalancheLogoUrl,
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  },
  [SupportedChainId.METIS]: {
    name: 'Metis',
    blockWaitMsBeforeWarning: 600000,
    docs: 'https://docs.metis.io/',
    explorer: 'https://andromeda-explorer.metis.io/',
    label: 'Metis',
    logoUrl: metisLogoUrl,
    nativeCurrency: { name: 'METIS', symbol: 'METIS', decimals: 18 },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
  },
  [SupportedChainId.MOONRIVER]: {
    name: 'Moonriver',
    blockWaitMsBeforeWarning: 600000,
    docs: 'https://docs.moonbeam.network/builders/get-started/networks/moonriver/',
    explorer: 'https://blockscout.moonriver.moonbeam.network/',
    label: 'Moonriver',
    logoUrl: moonriverLogoUrl,
    nativeCurrency: { name: 'MOVR', symbol: 'MOVR', decimals: 18 },
    rpcUrls: ['https://rpc.api.moonriver.moonbeam.network/'],
  },
  [SupportedChainId.ETHEREUM_MAINNET]: {
    name: 'Ethereum',
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/eth'],
  },
  [SupportedChainId.RINKEBY]: {
    name: 'Rinkeby',
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
    logoUrl: '',
    nativeCurrency: { name: 'Rinkeby ETH', symbol: 'rinkETH', decimals: 18 },
  },

  [SupportedChainId.KOVAN]: {
    name: 'Kovan',
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
    logoUrl: '',
    nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
  },
};
