import BigNumber from 'bignumber.js';
import type { AppProps } from 'next/app';
import Providers from 'Providers';
import React, { useEffect } from 'react';
import { Layout } from '~/components/layout';
import Web3ReactManager from '~/components/Web3ReactManager';
import { selectSetTheme, Theme, useThemeStore } from '~/stores/useThemeStore';
import '~/__styles__/globals.css';
import '~/__styles__/tailwind.css';

// set big number precision
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

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
    <Providers>
      <Web3ReactManager>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ReactManager>
    </Providers>
  );
}
