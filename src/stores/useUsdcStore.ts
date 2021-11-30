import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import BigNumber from 'bignumber.js';
import ERC20Abi from 'config/abi/IERC20.json';
import { banks } from 'config/constants/banks';
import { Address } from 'config/constants/types';
import { getContract } from 'utils/contractHelper';
import { isLocalhost } from 'utils/misc';
import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  usdcBalance: 0,
  isLoading: true,
};

export const useUsdcStore = createStore(
  combine(initialState, (set, _get) => ({
    initialize: async ({
      chainId,
      library,
      account,
    }: Required<
      Pick<Web3ReactContextInterface<Web3Provider>, 'chainId' | 'library' | 'account'>
    >) => {
      try {
        const bank = banks[chainId];
        const address = bank.underlying.address![chainId as keyof Address];
        const contract = getContract(library, ERC20Abi, address, account);

        if (contract == null) {
          throw new Error('Missing USDC contract');
        }

        const result = await contract.balanceOf(account);
        const usdcBalance = new BigNumber(String(result))
          .dividedBy(Math.pow(10, bank.underlying.decimals ?? 6))
          .toNumber();

        set({ isLoading: false, usdcBalance });
      } catch (error) {
        console.error('Failed to initialize usdc store', error);
        set(initialState);

        if (isLocalhost()) {
          throw error; // rethrow in development
        }
      }
    },
  }))
);
