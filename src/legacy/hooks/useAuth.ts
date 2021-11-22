import { useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { supportedChainIds } from 'config/constants/networks';
import { ConnectorNames } from 'config/constants/types';
import { CONNECTOR_STORAGE_KEY } from 'config/constants/values';
import { useCallback } from 'react';
import { useAppDispatch } from 'state';
import { clearAllTransactions } from 'state/transactions/state';
import { clearUser } from 'state/user/state';
import { setupNetwork } from 'utils/wallet';
import { connectorLibrary } from 'utils/web3Connectors';
import useToast from './useToast';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { activate, deactivate, chainId } = useWeb3React();
  const { toastError } = useToast();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorLibrary[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (supportedChainIds.includes(chainId as number)) {
            const hasSetup = await setupNetwork(chainId as number);
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(CONNECTOR_STORAGE_KEY);
            if (error instanceof NoEthereumProviderError) {
              toastError('Provider Error', 'No provider was found');
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              toastError('Authorization Error', 'Please authorize to access your account');
            } else {
              toastError(error.name, error.message);
            }
          }
        });
      } else {
        toastError("Can't find connector", 'The connector config is wrong');
      }
    },
    [activate, chainId, toastError]
  );

  const logout = useCallback(() => {
    dispatch(clearUser());
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorLibrary.walletconnect.close();
      connectorLibrary.walletconnect.walletConnectProvider = null;
    }
    window.localStorage.removeItem(CONNECTOR_STORAGE_KEY);
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }));
    }
  }, [chainId, deactivate, dispatch]);

  return { login, logout };
};

export default useAuth;
