import { SupportedTestNetworks } from 'config/constants/networks';
import { useMemo } from 'react';
import { getBlockExplorerUrl, getSwapRouterUrl } from 'utils/networkHelper';
import { useWeb3 } from './useWeb3';

export const useNetwork = () => {
  const { chainId } = useWeb3();

  const blockExplorerUrl = useMemo(() => {
    if (chainId) {
      return getBlockExplorerUrl(chainId);
    }
    return getBlockExplorerUrl(1);
  }, [chainId]);

  const swapRouterUrl = useMemo(() => {
    if (chainId) {
      return getSwapRouterUrl(chainId);
    }
    return getSwapRouterUrl(1);
  }, [chainId]);

  const isTestnet = useMemo(() => {
    return SupportedTestNetworks.includes(chainId ?? -1);
  }, [chainId]);

  return {
    blockExplorerUrl,
    swapRouterUrl,
    isTestnet,
  };
};
