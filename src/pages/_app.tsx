import { Web3ReactProvider } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout } from '~/components/layout';
import Web3ReactManager from '~/components/Web3ReactManager';
import store from '~/state';
import ApplicationUpdater from '~/state/application/updater';
import BanksUpdater from '~/state/banks/updater';
import MulticallUpdater from '~/state/multicall/updater';
import TransactionUpdater from '~/state/transactions/updater';
import { selectSetTheme, Theme, useThemeStore } from '~/stores/useThemeStore';
import getLibrary from '~/utilities/getLibrary';
import '~/__styles__/globals.css';
import '~/__styles__/tailwind.css';

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const Web3ProviderNetwork = dynamic(() => import('~/components/Web3ProviderNetwork'), {
  ssr: false,
});

if (typeof window !== 'undefined' && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <BanksUpdater />
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const setTheme = useThemeStore(selectSetTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (storedPrefs) {
        setTheme(storedPrefs as Theme);
      }
    }
  }, [setTheme]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Updaters />
          <Web3ReactManager>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Web3ReactManager>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}
