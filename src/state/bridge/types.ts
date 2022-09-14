export interface HistoryItem {
  transactionHash: string;
  fromNetwork: number;
  toNetwork: number;
  // token address on the from / to network
  fromNetworkToken: string;
  toNetworkToken: string;
  transactionTime: number;
  autoSuccess: boolean;
}

export interface AddHistoryPayload {
  transactionHash: string;
  fromNetwork: number;
  toNetwork: number;
  // token address on the from / to network
  fromNetworkToken: string;
  toNetworkToken: string;
  transactionTime: number;
}
