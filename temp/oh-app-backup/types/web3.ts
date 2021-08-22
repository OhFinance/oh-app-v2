export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}

export interface Connector {
  readonly title: string;
  readonly icon: string;
  readonly connectorId: ConnectorNames;
}