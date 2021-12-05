import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { load, save } from 'redux-localstorage-simple';
import application from './application/reducer';
import multicall from './multicall/slice';
import transactions from './transactions/reducer';

const PERSISTED_KEYS: string[] = ['transactions'];

const store = configureStore({
  reducer: {
    application,
    transactions,
    multicall,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: process.env.NODE_ENV === 'test',
  }),
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
