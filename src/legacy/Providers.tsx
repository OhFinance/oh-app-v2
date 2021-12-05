import { Web3ReactProvider } from '@web3-react/core';
import { PollerProvider } from 'contexts/PollerContext';
import { ToastProvider } from 'contexts/ToastContext';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Provider } from 'react-redux';
import store from 'state';
import { getLibrary } from 'utils/web3Connectors';

const Web3ProviderNetwork = dynamic(() => import('~/components/Web3ProviderNetwork'), {
  ssr: false,
});

const Providers: FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ToastProvider>
            <PollerProvider>{children}</PollerProvider>
          </ToastProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};

export default Providers;
