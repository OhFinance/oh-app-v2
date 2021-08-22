import { Connector, ConnectorNames } from './types';

const connectors: Connector[] = [
  {
    title: 'Metamask',
    icon: '',
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: '',
    connectorId: ConnectorNames.WalletConnect,
  },
];

export default connectors;
