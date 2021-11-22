import { SerializableTransactionReceipt } from './types';

export interface AddTransaction {
  chainId: number;
  hash: string;
  from: string;
  approval?: { tokenAddress: string; spender: string };
  summary?: string;
}

export interface ClearAllTransactions {
  chainId: number;
}

export interface CheckedTransaction {
  chainId: number;
  hash: string;
  blockNumber: number;
}

export interface FinalizeTransaction {
  chainId: number;
  hash: string;
  receipt: SerializableTransactionReceipt;
}
