import MetamaskLogo from 'assets/img/metamask.svg';
import WalletConnectLogo from 'assets/img/walletconnect.svg';
import { Connector, ConnectorNames } from './types';

export const connectors: Connector[] = [
  {
    title: 'Metamask',
    icon: MetamaskLogo,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnectLogo,
    connectorId: ConnectorNames.WalletConnect,
  },
];

export const connectorNames: { [connectorId: string]: string } = {
  [ConnectorNames.Injected]: 'Metamask',
  [ConnectorNames.WalletConnect]: 'WalletConnect',
};
