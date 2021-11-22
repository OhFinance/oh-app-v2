import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { supportedChainIds } from 'config/constants/networks';
import { ConnectorNames } from 'config/constants/types';
import { DEFAULT_POLLING_INTERVAL } from 'config/constants/values';
import { ethers } from 'ethers';
import { nodes } from './web3Providers';

// Connectors available to initialize Web3 instances

// Injected (i.e. Metamask)
const injected = new InjectedConnector({ supportedChainIds });

// WalletConnect, hub for mobile access
const walletconnect = new WalletConnectConnector({
  rpc: nodes,
  qrcode: true,
  // pollingInterval: DEFAULT_POLLING_INTERVAL,
  supportedChainIds,
});

export const connectorLibrary: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = DEFAULT_POLLING_INTERVAL;
  return library;
};
