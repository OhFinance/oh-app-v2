import createStore from 'zustand';
import { combine } from 'zustand/middleware';

export enum Network {
  Ethereum = 'Ethereum',
  Avalanche = 'Avalanche',
  OH = 'OH',
}

const initialState = {
  walletConnected: false,
  showConnectWalletDialog: false,
  selectedNetwork: Network.Ethereum,
  walletAddress: '0x0000000000000000000000000000000000000000',
  portfolioBalance: 0,
  portfolioPl: 0, // Amount gained or lost (USDC, can be negative)
  portfolioPlPercent: 0, // Amount gained or lost (Percent)
  availableOh: 0,
  availableUsdc: 0,
  interestEarned: 0,
};

export const useWalletStore = createStore(
  combine(initialState, (set, get) => ({
    toggleConnectWalletDialog: () =>
      set({ showConnectWalletDialog: !get().showConnectWalletDialog }),
    setPortfolioBalance: (portfolioBalance: number) => set({ portfolioBalance }),
    setAvailableOh: (availableOh: number) => set({ availableOh }),
    setAvailableUsdc: (availableUsdc: number) => set({ availableUsdc }),
    setInterestEarned: (interestEarned: number) => set({ interestEarned }),
    setSelectedNetwork: (selectedNetwork: Network) => set({ selectedNetwork }),
    setWalletConnected: (walletConnected: boolean) => set({ walletConnected }),
    setWalletAddress: (walletAddress: string) => set({ walletAddress }),
  }))
);
