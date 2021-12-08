import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import application from './application/reducer';
import banks from './banks/reducer';
import multicall from './multicall/slice';
import stake from './stake/reducer';
import transactions from './transactions/reducer';

const PERSISTED_KEYS: string[] = ['transactions'];

const store = configureStore({
  reducer: {
    application,
    transactions,
    multicall,
    banks,
    stake,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
