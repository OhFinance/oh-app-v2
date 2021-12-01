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
    fetchData: async (timeRange: ChartTimeRange = 'all') => {
      set({ isLoading: true });

      let url;
      switch (timeRange) {
        case 'hourly':
          url =
            'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=10&aggregate=3&e=Kraken';
          break;
        case 'daily':
          url =
            'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=20&aggregate=3&e=Kraken';
          break;
        case 'weekly':
          url =
            'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=3&e=Kraken';
          break;
        case 'monthly':
          url =
            'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=40&aggregate=3&e=Kraken';
          break;
        case 'yearly':
          url =
            'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=50&aggregate=3&e=Kraken';
          break;
        default:
        case 'all':
          url =
            'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100&aggregate=3&e=Kraken';
          break;
      }

      axios
        .get(url)
        .then((res) => {
          set({ isLoading: false, data: (res.data as any)['Data'] });
        })
        .catch((error) => {
          console.log(error);
          set({ isLoading: false });
        });
    },
    setTimeRange(timeRange: ChartTimeRange) {
      // We cannot use `this` here because we pass this action function as a reference
      useChartStore.getState().fetchData(timeRange);
    },
  }))
);
