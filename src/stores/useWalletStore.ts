import createStore from 'zustand';
import { combine } from 'zustand/middleware';

export enum Network {
  Ethereum = 'Ethereum',
  Avalanche = 'Avalanche',
  OH = 'OH',
}

const initialState = {
  portfolioPl: 0, // Amount gained or lost (USDC, can be negative)
  portfolioPlPercent: 0, // Amount gained or lost (Percent)

  interestEarned: 0,
};

export const useWalletStore = createStore(combine(initialState, (set, get) => ({})));
