import { useEffect } from 'react';
import { useUsdcStore } from '~/stores/useUsdcStore';
import { useWalletStore } from '~/stores/useWalletStore';
import { useWeb3 } from './useWeb3';

export const useWeb3StoreConnector = () => {
  const { active, account, chainId, connector, library, error } = useWeb3();

  useEffect(() => {
    useWalletStore.getState().setWalletConnected(active, account || undefined);
    if (active && account && chainId != null && library != null) {
      useUsdcStore.getState().initialize({ chainId, library, account });
    }
  }, [active, account, chainId, library]);
};
