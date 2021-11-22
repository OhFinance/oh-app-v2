import { useEffect, useState, useRef, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { getDefaultProvider } from 'utils/web3Providers';

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
export const useWeb3 = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, account, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const defaultProvider = useMemo(() => getDefaultProvider(chainId), [chainId]);
  const [provider, setProvider] = useState(library || defaultProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || defaultProvider);
      refEth.current = library;
    }
  }, [library, defaultProvider]);

  return { library: provider, account, chainId, ...web3React };
};
