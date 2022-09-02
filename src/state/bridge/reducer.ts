import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddHistoryPayload, HistoryItem } from './types';

export interface HistoryState {
  history: HistoryItem[];
}
export const initialState: HistoryState = {
  history: [],
};

export const bridgeSlice = createSlice({
  name: 'bridgeHistory',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<AddHistoryPayload>) => {
      state.history = [...state.history, action.payload];
    },
  },
});

export const { addHistory } = bridgeSlice.actions;

export default bridgeSlice.reducer;
