import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { useEffect, useMemo, useRef } from 'react';
import { getDefaultProvider } from 'utils/web3Providers';

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
export const useWeb3 = (): Web3ReactContextInterface<Web3Provider> => {
  const web3State = useWeb3React();
  const { library, chainId } = web3State;
  const refEth = useRef(library);
  const defaultProvider = useMemo(() => getDefaultProvider(chainId), [chainId]);

  useEffect(() => {
    if (library !== refEth.current) {
      refEth.current = library;
    }
  }, [library, defaultProvider]);

  return web3State;
};
