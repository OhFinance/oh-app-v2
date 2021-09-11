import createStore from 'zustand';
import { combine } from 'zustand/middleware';

export enum CryptoNetwork {
  Ethereum = 'Ethereum',
  Avalanche = 'Avalanche',
  OH = 'OH',
}

const initialState = {
  walletConnected: false,
  showConnectWalletDialog: false,
  selectedNetwork: CryptoNetwork.Ethereum,
  walletAddress: '0x0000000000000000000000000000000000000000',
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
    setSelectedNetwork: (selectedNetwork: CryptoNetwork) => set({ selectedNetwork }),
    setWalletConnected: (walletConnected: boolean) => set({ walletConnected }),
    setWalletAddress: (walletAddress: string) => set({ walletAddress }),
  }))
);
