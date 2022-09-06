import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '@uniswap/sdk-core';
import { SupportedChainId } from 'constants/chains';
import { AddHistoryPayload, HistoryItem } from './types';

export interface BridgeState {
  history: HistoryItem[];
  toNetwork: number;
  fromNetwork: number;
  selectedToken: { [chainId: number]: Token };
  // bridge amount
  amount: string;
  routerAddress: string;
}

export const initialState: BridgeState = {
  history: [],
  toNetwork: SupportedChainId.AVALANCHE,
  fromNetwork: SupportedChainId.ETHEREUM_MAINNET,
  selectedToken: undefined,
  amount: '0',
  routerAddress: '',
};

export const bridgeSlice = createSlice({
  name: 'bridgeHistory',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<AddHistoryPayload>) => {
      state.history = [...state.history, action.payload];
    },
    setToNetwork: (state, action: PayloadAction<number>) => {
      state.toNetwork = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<{ [chainId: number]: Token }>) => {
      state.selectedToken = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setRouterAddress: (state, action: PayloadAction<string>) => {
      state.routerAddress = action.payload;
    },
  },
});

export const { addHistory, setToNetwork, setSelectedToken, setAmount, setRouterAddress } =
  bridgeSlice.actions;

export default bridgeSlice.reducer;
