import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from '../constants/chains';
import getLibrary from '../utils/getLibrary';
import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';

const INFURA_KEY = '4bf032f2d38a4ed6bb975b80d6340847';
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
}

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.ETHEREUM]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.AVALANCHE]: `https://api.avax.network/ext/bc/C/rpc`,
};

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  qrcode: true,
});

// ETH mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1,
});

// ETH mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1],
});

// ETH mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[SupportedChainId.ETHEREUM],
  appName: 'Oh! Finance',
  appLogoUrl: 'TODO',
});
