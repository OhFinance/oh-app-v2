import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  showConnectWalletDialog: false,
  portfolioBalance: 0,
  availableOh: 9999,
  availableUsdc: 9999,
  interestEarned: 0,
};

export const useWalletStore = createStore(
  combine(initialState, (set, get) => ({
    initialState,
    toggleConnectWalletDialog: () =>
      set({ showConnectWalletDialog: !get().showConnectWalletDialog }),
    setPortfolioBalance: (portfolioBalance: number) => set({ portfolioBalance }),
    setAvailableOh: (availableOh: number) => set({ availableOh }),
    setAvailableUsdc: (availableUsdc: number) => set({ availableUsdc }),
    setInterestEarned: (interestEarned: number) => set({ interestEarned }),
  }))
);
