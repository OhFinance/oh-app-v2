import createStore from 'zustand';
import { combine } from 'zustand/middleware';
import { getOhTokenPrice } from '~/services/ohTokenPriceService';

const initialState = {
  price: 0,
  isLoading: true,
};

export const usePriceStore = createStore(
  combine(initialState, (set, _get) => ({
    fetchData: async () => {
      set({ isLoading: true });

      try {
        const price = await getOhTokenPrice();
        set({ isLoading: false, price });
      } catch (error) {
        console.log(error);
        set({ isLoading: false });
      }
    },
  }))
);
