import createStore from 'zustand';

const initialState = {
  portfolioBalance: '0',
  interestEarned: '0',
};

export const useWalletStore = createStore<typeof initialState>((set, get) => ({
  ...initialState,
  setPortfolioBalance: (portfolioBalance: string) => set({ portfolioBalance }),
  setInterestEarned: (interestEarned: string) => set({ interestEarned }),
}));
