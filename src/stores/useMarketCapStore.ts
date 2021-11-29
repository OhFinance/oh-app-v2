import createStore from 'zustand';
import { combine } from 'zustand/middleware';
import { getMarketCap } from '~/services/ohTokenPriceService';

const initialState = {
  marketCap: 0,
  isLoading: true,
};

export const useMarketCapStore = createStore(
  combine(initialState, (set, _get) => ({
    fetchData: async () => {
      set({ isLoading: true });

      try {
        const marketCap = await getMarketCap();
        set({ isLoading: false, marketCap });
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
      }
    },
  }))
);
