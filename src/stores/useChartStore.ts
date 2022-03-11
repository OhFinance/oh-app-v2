import axios from 'axios';
import createStore from 'zustand';
import { combine } from 'zustand/middleware';

export type ChartTimeRange = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all';

const initialState = {
  data: null,
  isLoading: true,
};

export const useChartStore = createStore(
  combine(initialState, (set, get) => ({
    fetchData: async (chainId: number, address: string, timeRange: ChartTimeRange = 'all') => {
      set({ isLoading: true });

      let url;
      switch (timeRange) {
        case 'hourly':
          url = `https://api.oh.finance/tvl/history?addr=${address}&chain=${chainId}`;
          break;
        case 'daily':
          url = `https://api.oh.finance/tvl/history?addr=${address}&chain=${chainId}`;
          break;
        case 'weekly':
          url = `https://api.oh.finance/tvl/history?addr=${address}&chain=${chainId}`;
          break;
        case 'monthly':
          url = `https://api.oh.finance/tvl/history?addr=${address}&chain=${chainId}`;
          break;
        case 'yearly':
          url = `https://api.oh.finance/tvl/history?addr=${address}&chain=${chainId}`;
          break;
        default:
        case 'all':
          url = `https://api.oh.finance/tvl/history?addr=${address}&chain=${chainId}`;
          break;
      }

      axios
        .get(url)
        .then((res) => {
          set({
            isLoading: false,
            data: (res.data as any)['data'].map((item: { timestamp: string; tvl: number }) => ({
              time: Math.floor(new Date(item.timestamp).getTime() / 1000),
              open: item.tvl,
              close: item.tvl,
              low: item.tvl,
            })),
          });
        })
        .catch((error) => {
          set({ isLoading: false });
        });
    },
    setTimeRange(chainId: number, address: string, timeRange: ChartTimeRange) {
      // We cannot use `this` here because we pass this action function as a reference
      useChartStore.getState().fetchData(chainId, address, timeRange);
    },
  }))
);
