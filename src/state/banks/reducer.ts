import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetBankAPY } from './actions';
import { BankStore } from './types';

export interface BankState {
  [chainId: number]: BankStore;
}

export const initialState: BankState = {};

export const bankSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    setBankAPY: (banks, action: PayloadAction<SetBankAPY[]>) => {
      const bankAPYs = action.payload;
      bankAPYs.forEach(({ chainId, address, apys }) => {
        const currentBanks = banks[chainId] ?? {};
        const bank = currentBanks[address] ?? {};
        bank.apys = apys;
        currentBanks[address] = bank;
        banks[chainId] = currentBanks;
      });
    },
  },
});

export const { setBankAPY } = bankSlice.actions;

export default bankSlice.reducer;
