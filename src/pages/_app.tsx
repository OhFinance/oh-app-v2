import '@reach/dialog/styles.css';
import { Web3ReactProvider } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { useCirculatingSupplyStore } from 'stores/useCirculatingSupplyStore';
import { useMarketCapStore } from 'stores/useMarketCapStore';
import { usePriceStore } from 'stores/usePriceStore';
import { useTVLStore } from 'stores/useTVLStore';
import ThemeProvider, { ThemedGlobalStyle } from 'theme';
import { Layout } from '~/components/layout';
import Web3ReactManager from '~/components/Web3ReactManager';
import store from '~/state';
import ApplicationUpdater from '~/state/application/updater';
import BanksUpdater from '~/state/banks/updater';
import MulticallUpdater from '~/state/multicall/updater';
import TransactionUpdater from '~/state/transactions/updater';
import { selectSetTheme, Theme, useThemeStore } from '~/stores/useThemeStore';
import getLibrary from '~/utilities/getLibrary';

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const Web3ProviderNetwork: any = dynamic(() => import('~/components/Web3ProviderNetwork'), {
  ssr: false,
});

if (typeof window !== 'undefined' && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updaters() {
  const fetchPrice = usePriceStore((state) => state.fetchData);
  const fetchMarketCap = useMarketCapStore((state) => state.fetchData);
  const fetchSupply = useCirculatingSupplyStore((state) => state.fetchData);
  const fetchTVL = useTVLStore((state) => state.fetchData);
  // This effect will run only once
  useEffect(() => {
    fetchPrice();
    fetchMarketCap();
    fetchSupply();
    fetchTVL();
  }, [fetchPrice, fetchMarketCap, fetchSupply, fetchTVL]);

  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <BanksUpdater />
    </>
  );
}

export default function App({ Component, pageProps }: any) {
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
            <ThemeProvider>
              <>
                <ThemedGlobalStyle />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </>
            </ThemeProvider>
          </Web3ReactManager>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}
