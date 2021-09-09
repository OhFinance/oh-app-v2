import createStore from 'zustand';
import { combine } from 'zustand/middleware';

/*const enum CryptoNetworks {
  Ethereum,
  Avalanche,
  OH
}*/

const initialState = {
  showConnectWalletDialog: false,
  walletConnected: false,
  portfolioBalance: 0,
  availableOh: 9999,
  availableUsdc: 9999,
  interestEarned: 0,
  // TODO: try to get this into an enum
  // 0 = Ethereum, 1 = Avalanche, 2 = OH
  selectedNetwork: 0,
  walletAddress: '0x0000000000000000000000000000000000000000',
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
    setSelectedNetwork: (selectedNetwork: number) => set({ selectedNetwork }),
    setWalletConnected: (walletConnected: boolean) => set({ walletConnected }),
    setWalletAddress: (walletAddress: string) => set({ walletAddress }),
  }))
);
