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
  availableUsdc: 100,
  toBeDeposited: 0,
  toBeWithdrawn: 0,
  interestEarned: 0,
};

export const useWalletStore = createStore(
  combine(initialState, (set, get) => ({
    connectWallet: () => set({ walletConnected: true, showConnectWalletDialog: false }),
    toggleConnectWalletDialog: () =>
      set({ showConnectWalletDialog: !get().walletConnected && !get().showConnectWalletDialog }),
    setPortfolioBalance: (portfolioBalance: number) => set({ portfolioBalance }),
    setAvailableOh: (availableOh: number) => set({ availableOh }),
    setAvailableUsdc: (availableUsdc: number) => set({ availableUsdc }),
    setToBeDeposited: (toBeDeposited: number) => set({ toBeDeposited }),
    setToBeWithdrawn: (toBeWithdrawn: number) => set({ toBeWithdrawn }),
    setInterestEarned: (interestEarned: number) => set({ interestEarned }),
    setSelectedNetwork: (selectedNetwork: Network) => set({ selectedNetwork }),
    setWalletConnected: (
      walletConnected: boolean,
      walletAddress = '0x0000000000000000000000000000000000000000'
    ) =>
      set({
        walletConnected,
        walletAddress,
        showConnectWalletDialog: walletConnected ? false : get().showConnectWalletDialog,
      }),
    depositUdsc: () =>
      set({ availableUsdc: get().availableUsdc + get().toBeDeposited, toBeDeposited: 0 }),
    widthdrawUsdc: () =>
      set({ availableUsdc: get().availableUsdc - get().toBeWithdrawn, toBeWithdrawn: 0 }),
  }))
);
