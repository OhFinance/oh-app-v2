import createStore from 'zustand';
import { combine } from 'zustand/middleware';
import { getCirculatingSupply } from '~/services/ohTokenPriceService';

const initialState = {
  supply: 0,
  isLoading: true,
};

export const useCirculatingSupplyStore = createStore(
  combine(initialState, (set, _get) => ({
    fetchData: async () => {
      set({ isLoading: true });

      try {
        const supply = await getCirculatingSupply();
        set({ isLoading: false, supply });
      } catch (error) {
        set({ isLoading: false });
      }
    },
  }))
);
