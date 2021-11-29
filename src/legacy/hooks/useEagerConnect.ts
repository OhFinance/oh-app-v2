import { ConnectorNames } from 'config/constants/types';
import { CONNECTOR_STORAGE_KEY } from 'config/constants/values';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';

export const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(CONNECTOR_STORAGE_KEY) as ConnectorNames;

    if (connectorId) {
      login(connectorId);
    }
    // Only run this hook once, even if login ref changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
