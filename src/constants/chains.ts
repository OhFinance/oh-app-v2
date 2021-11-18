export enum SupportedChainId {
  ETHEREUM = 1,
  AVALANCHE = 43114,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.ETHEREUM,
  SupportedChainId.AVALANCHE,
];

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number;
  readonly explorer: string;
  readonly label: string;
  readonly logoUrl?: string;
  readonly rpcUrls?: string[];
  readonly nativeCurrency: {
    name: string; // 'Goerli ETH',
    symbol: string; // 'gorETH',
    decimals: 18; //18,
  };
}

export type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {
  readonly [chainId in SupportedChainId]: L1ChainInfo;
};

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.ETHEREUM]: {
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    logoUrl: '',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.AVALANCHE]: {
    explorer: 'https://cchain.explorer.avax.network/',
    label: 'Avalanche C-Chain',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  },
};
