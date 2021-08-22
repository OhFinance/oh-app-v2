import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { ConnectorNames } from "config/constants/types";
import { connectorLibrary } from "utils/web3-connectors";

const useAuth = () => {
  // const dispatch = useAppDispatch();
  const { activate, deactivate } = useWeb3React();
  // const { toastError } = useToast();

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorLibrary[connectorID];
    if (connector) {
      activate(connector, async (error: Error) => {
        // if (error instanceof UnsupportedChainIdError) {
        //   const hasSetup = await setupNetwork();
        //   if (hasSetup) {
        //     activate(connector);
        //   }
        // } else {
        //   window.localStorage.removeItem(connectorLocalStorageKey);
        //   if (
        //     error instanceof NoEthereumProviderError ||
        //     error instanceof NoBscProviderError
        //   ) {
        //     toastError("Provider Error", "No provider was found");
        //   } else if (
        //     error instanceof UserRejectedRequestErrorInjected ||
        //     error instanceof UserRejectedRequestErrorWalletConnect
        //   ) {
        //     if (connector instanceof WalletConnectConnector) {
        //       const walletConnector = connector as WalletConnectConnector;
        //       walletConnector.walletConnectProvider = null;
        //     }
        //     toastError(
        //       "Authorization Error",
        //       "Please authorize to access your account"
        //     );
        //   } else {
        //     toastError(error.name, error.message);
        //   }
        // }
      });
    } else {
      // toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    // dispatch(profileClear());
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;