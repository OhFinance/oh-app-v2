import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  portfolioBalance: 0,
  availableOh: 9999,
  availableUsdc: 9999,
  interestEarned: 0,
};

export const useWalletStore = createStore(
  combine(initialState, (set, _get) => ({
    initialState,
    setPortfolioBalance: (portfolioBalance: number) => set({ portfolioBalance }),
    setAvailableOh: (availableOh: number) => set({ availableOh }),
    setAvailableUsdc: (availableUsdc: number) => set({ availableUsdc }),
    setInterestEarned: (interestEarned: number) => set({ interestEarned }),
  }))
);
