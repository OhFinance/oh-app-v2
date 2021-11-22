import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddMulticallListeners,
  ErrorFetchingMulticallResults,
  FetchingMulticallResults,
  RemoveMulticallListeners,
  UpdateMulticallResults,
} from './actions';
import { toCallKey } from './helpers';

export interface MulticallState {
  callListeners?: {
    // on a per-chain basis
    [chainId: number]: {
      // stores for each call key the listeners' preferences
      [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        [blocksPerFetch: number]: number;
      };
    };
  };

  callResults: {
    [chainId: number]: {
      [callKey: string]: {
        data?: string | null;
        blockNumber?: number;
        fetchingBlockNumber?: number;
      };
    };
  };
}

const initialState: MulticallState = {
  callResults: {},
};

export const multicallSlice = createSlice({
  name: 'multicall',
  initialState,
  reducers: {
    addMulticallListeners: (state, action: PayloadAction<AddMulticallListeners>) => {
      const { calls, chainId, options } = action.payload;
      const blocksPerFetch = options?.blocksPerFetch ?? 1;

      const listeners: MulticallState['callListeners'] = state.callListeners
        ? state.callListeners
        : (state.callListeners = {});

      listeners[chainId] = listeners[chainId] ?? {};

      calls.forEach((call) => {
        const callKey = toCallKey(call);
        listeners[chainId][callKey] = listeners[chainId][callKey] ?? {};
        listeners[chainId][callKey][blocksPerFetch] =
          (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1;
      });
    },

    removeMulticallListeners: (state, action: PayloadAction<RemoveMulticallListeners>) => {
      const { calls, chainId, options } = action.payload;
      const blocksPerFetch = options?.blocksPerFetch ?? 1;

      const listeners: MulticallState['callListeners'] = state.callListeners
        ? state.callListeners
        : (state.callListeners = {});

      if (!listeners[chainId]) return;
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        if (!listeners[chainId][callKey]) return;
        if (!listeners[chainId][callKey][blocksPerFetch]) return;

        if (listeners[chainId][callKey][blocksPerFetch] === 1) {
          delete listeners[chainId][callKey][blocksPerFetch];
        } else {
          listeners[chainId][callKey][blocksPerFetch]--;
        }
      });
    },
    fetchingMulticallResults: (state, action: PayloadAction<FetchingMulticallResults>) => {
      const { calls, chainId, fetchingBlockNumber } = action.payload;

      state.callResults[chainId] = state.callResults[chainId] ?? {};
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        const current = state.callResults[chainId][callKey];
        if (!current) {
          state.callResults[chainId][callKey] = {
            fetchingBlockNumber,
          };
        } else {
          if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return;
          state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber;
        }
      });
    },
    errorFetchingMulticallResults: (
      state,
      action: PayloadAction<ErrorFetchingMulticallResults>
    ) => {
      const { fetchingBlockNumber, chainId, calls } = action.payload;
      state.callResults[chainId] = state.callResults[chainId] ?? {};
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        const current = state.callResults[chainId][callKey];
        if (!current) return; // only should be dispatched if we are already fetching
        if (current.fetchingBlockNumber === fetchingBlockNumber) {
          delete current.fetchingBlockNumber;
          current.data = null;
          current.blockNumber = fetchingBlockNumber;
        }
      });
    },
    updateMulticallResults: (state, action: PayloadAction<UpdateMulticallResults>) => {
      const { chainId, results, blockNumber } = action.payload;

      state.callResults[chainId] = state.callResults[chainId] ?? {};
      Object.keys(results).forEach((callKey) => {
        const current = state.callResults[chainId][callKey];
        if ((current?.blockNumber ?? 0) > blockNumber) return;
        state.callResults[chainId][callKey] = {
          data: results[callKey],
          blockNumber,
        };
      });
    },
  },
});

export const {
  addMulticallListeners,
  removeMulticallListeners,
  fetchingMulticallResults,
  errorFetchingMulticallResults,
  updateMulticallResults,
} = multicallSlice.actions;

export default multicallSlice.reducer;
