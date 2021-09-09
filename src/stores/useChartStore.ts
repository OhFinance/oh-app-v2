import axios from 'axios';
import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  data: [],
  isLoading: true,
};

export const useChartStore = createStore(
  combine(initialState, (set, _get) => ({
    initialState,
    fetchData: async () => {
      set({ isLoading: true });
      axios
        .get(
          'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=50&aggregate=3&e=Kraken'
        )
        .then((res) => {
          setTimeout(() => set({ isLoading: false, data: res.data['Data'] }), 3000);
        })
        .catch((error) => {
          console.log(error);
          set({ isLoading: false, data: [] });
        });
    },
  }))
);
