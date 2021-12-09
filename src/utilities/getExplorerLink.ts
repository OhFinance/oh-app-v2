import { SupportedChainId } from '~/constants/chains';

const EXPLORER_URLS: { [chainId: number]: string } = {
  [SupportedChainId.ETHEREUM_MAINNET]: 'etherscan.io',
  [SupportedChainId.RINKEBY]: 'rinkeby.etherscan.io',
  [SupportedChainId.KOVAN]: 'kovan.etherscan.io',
  [SupportedChainId.AVALANCHE]: 'snowtrace.io',
};

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  const prefix = `https://${EXPLORER_URLS[chainId]}`;

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`;

    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`;

    case ExplorerDataType.BLOCK:
      return `${prefix}/block/${data}`;

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`;
    default:
      return `${prefix}`;
  }
}
