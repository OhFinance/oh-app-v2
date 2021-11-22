import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { now } from 'utils/misc';
import {
  AddTransaction,
  CheckedTransaction,
  ClearAllTransactions,
  FinalizeTransaction,
} from './actions';
import { TransactionDetails } from './types';

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

const initialState: TransactionState = {};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (transactions, action: PayloadAction<AddTransaction>) => {
      const { approval, chainId, from, hash, summary } = action.payload;
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = { hash, approval, summary, from, addedTime: now() };
      transactions[chainId] = txs;
    },
    clearAllTransactions: (transactions, action: PayloadAction<ClearAllTransactions>) => {
      const { chainId } = action.payload;
      if (!transactions[chainId]) {
        return;
      }
      transactions[chainId] = {};
    },
    checkedTransaction: (transactions, action: PayloadAction<CheckedTransaction>) => {
      const { blockNumber, chainId, hash } = action.payload;

      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    },
    finalizeTransaction: (transactions, action: PayloadAction<FinalizeTransaction>) => {
      const { chainId, hash, receipt } = action.payload;

      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = now();
    },
  },
});

export const { addTransaction, clearAllTransactions, checkedTransaction, finalizeTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
