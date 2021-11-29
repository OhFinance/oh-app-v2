import createStore from 'zustand';
import { combine } from 'zustand/middleware';
import { getTVL } from '~/services/ohTokenPriceService';

const initialState = {
  tvl: 0,
  isLoading: true,
};

export const useTVLStore = createStore(
  combine(initialState, (set, _get) => ({
    fetchData: async () => {
      set({ isLoading: true });

      try {
        const tvl = await getTVL();
        set({ isLoading: false, tvl });
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
      }
    },
  }))
);
