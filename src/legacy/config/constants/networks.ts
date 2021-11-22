import { Network } from './types';

import Ethereum from 'assets/img/eth.svg';
import Kovan from 'assets/img/kovan.svg';
import Rinkeby from 'assets/img/rinkeby.svg';
import Avalanche from 'assets/img/avax.svg';
import Fuji from 'assets/img/fuji.svg';
import { isLocalhost } from 'utils/misc';

export const SupportedNetworks = [1, 43114];

export const SupportedTestNetworks = [4, 42];

// only include testnets in live version until release
export const supportedChainIds = SupportedNetworks;
// [
//   ...SupportedTestNetworks,
//   ...(isLocalhost() ? SupportedNetworks : []),
// ];

// Avalanche Info: https://docs.avax.network/build/tutorials/platform/launch-your-ethereum-dapp
export const Networks: { [chainId: number]: Network } = {
  1: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  4: {
    chainId: '0x4',
    chainName: 'Rinkeby',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.infura.io'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  42: {
    chainId: '0x2a',
    chainName: 'Kovan',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://kovan.infura.io'],
    blockExplorerUrls: ['https://kovan.etherscan.io'],
  },
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  137: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  },
  250: {
    chainId: '0xfa',
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  43113: {
    chainId: '0xa869',
    chainName: 'Fuji',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
  43114: {
    chainId: '0xa86a',
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io'],
  },
};

export const NetworkIcons: { [chainId: number]: string } = {
  1: Ethereum,
  4: Rinkeby,
  42: Kovan,
  43113: Fuji,
  43114: Avalanche,
};

export const NetworkRouter: { [chainId: number]: string } = {
  1: `https://app.sushi.com/swap?inputCurrency=0x16ba8efe847ebdfef99d399902ec29397d403c30&outputCurrency=ETH`,
  // 4: Rinkeby,
  // 42: Kovan,
  // 43113: Fuji,
  43114:
    'https://traderjoexyz.com/#/trade?inputCurrency=0x937E077aBaEA52d3abf879c9b9d3f2eBd15BAA21&outputCurrency=AVAX',
};
