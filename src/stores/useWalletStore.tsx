import createStore from 'zustand';

const initialState = {
  portfolioBalance: 0,
  availableOh: 0,
  availableUsdc: 0,
  interestEarned: 0,
};

export const useWalletStore = createStore<typeof initialState>((set, get) => ({
  ...initialState,
  setPortfolioBalance: (portfolioBalance: number) => set({ portfolioBalance }),
  setAvailableOh: (availableOh: number) => set({ availableOh }),
  setAvailableUsdc: (availableUsdc: number) => set({ availableUsdc }),
  setInterestEarned: (interestEarned: number) => set({ interestEarned }),
}));
