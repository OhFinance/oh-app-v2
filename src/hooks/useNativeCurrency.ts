import { NativeCurrency } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { SupportedChainId } from '~/constants/chains';
import { nativeOnChain } from '~/constants/tokens';
import { useActiveWeb3React } from '~/hooks/web3';

export default function useNativeCurrency(): NativeCurrency {
  const { chainId } = useActiveWeb3React();
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.ETHEREUM_MAINNET),
    [chainId]
  );
}
