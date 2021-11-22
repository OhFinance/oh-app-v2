import { Result } from '@ethersproject/abi';
import { Call, CallResult, ListenerOptions } from './types';

export interface AddMulticallListeners {
  calls: Call[];
  chainId: number;
  options?: ListenerOptions;
}

export interface RemoveMulticallListeners {
  calls: Call[];
  chainId: number;
  options?: ListenerOptions;
}

export interface FetchingMulticallResults {
  chainId: number;
  fetchingBlockNumber: number;
  calls: Call[];
}

export interface ErrorFetchingMulticallResults {
  chainId: number;
  fetchingBlockNumber: number;
  calls: Call[];
}

export interface UpdateMulticallResults {
  chainId: number;
  results: {
    [callKey: string]: string | null;
  };
  blockNumber: number;
}
