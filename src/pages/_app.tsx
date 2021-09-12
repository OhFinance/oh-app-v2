import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Layout } from '~/components/layout';
import { selectSetTheme, Theme, useThemeStore } from '~/stores/useThemeStore';
import '~/__styles__/globals.css';
import '~/__styles__/tailwind.css';

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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
