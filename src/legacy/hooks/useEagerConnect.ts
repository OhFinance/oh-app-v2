import { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { CONNECTOR_STORAGE_KEY } from 'config/constants/values';
import { ConnectorNames } from 'config/constants/types';

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(CONNECTOR_STORAGE_KEY) as ConnectorNames;

    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;
