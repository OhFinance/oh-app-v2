import type { AppProps } from 'next/app';
import React from 'react';
import { Layout } from '~/components/layout';
import '~/__styles__/globals.css';
import '~/__styles__/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
