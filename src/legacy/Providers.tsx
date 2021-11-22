import { Web3ReactProvider } from '@web3-react/core';
import { PollerProvider } from 'contexts/PollerContext';
import { ToastProvider } from 'contexts/ToastContext';
import { FC } from 'react';
import { Provider } from 'react-redux';
import store from 'state';
import { getLibrary } from 'utils/web3Connectors';

const Providers: FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastProvider>
          <PollerProvider>{children}</PollerProvider>
        </ToastProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
