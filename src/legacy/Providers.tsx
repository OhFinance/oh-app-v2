import { Web3ReactProvider } from '@web3-react/core';
import { PollerProvider } from 'contexts/PollerContext';
import { ToastProvider } from 'contexts/ToastContext';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { getLibrary } from 'utils/web3Connectors';
import ApplicationUpdater from '~/state/application/updater';
import BanksUpdater from '~/state/banks/updater';
import MulticallUpdater from '~/state/multicall/updater';
import TransactionUpdater from '~/state/transactions/updater';
import store from '../state';

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

const Providers: FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Updaters />
          <ToastProvider>
            <PollerProvider>{children}</PollerProvider>
          </ToastProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};

export default Providers;
