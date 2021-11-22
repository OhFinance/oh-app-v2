import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { isLocalhost } from 'utils/misc';
import updateVersion from './actions';
import banks from './banks/state';
import block from './block/state';
import multicall from './multicall/state';
import transactions from './transactions/state';
import user from './user/state';

const PERSISTED_KEYS: string[] = ['user', 'transactions'];

let load: any, save: any;
if (typeof window !== 'undefined') {
  load = require('redux-localstorage-simple').load;
  save = require('redux-localstorage-simple').save;
} else {
  // Mock the load and save functions to avoid getting errors when Next is building the server side app
  load = ({ preloadedState = {} } = {}) => {
    preloadedState;
  };
  save = () => (store: any) => (next: any) => (action: any) => {
    return next(action);
  };
}

const store = configureStore({
  devTools: isLocalhost(),
  reducer: {
    banks,
    block,
    multicall,
    user,
    transactions,
  },
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })];
  },
  preloadedState: load({
    states: PERSISTED_KEYS,
  }),
});

store.dispatch(updateVersion());

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
