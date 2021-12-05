import { BigNumber } from '@ethersproject/bignumber';
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { useBankContract } from '~/hooks/contracts/useBankContract';
import { useSingleCallResult } from '~/state/multicall/hooks';

export function useVirtualPrice(token?: Currency): CurrencyAmount<Token> | undefined {
  const contract = useBankContract(token?.isToken ? token.address : undefined, false);
  const virtualPrice: BigNumber = useSingleCallResult(contract, 'virtualPrice')?.result?.[0];

  return useMemo(
    () =>
      token?.isToken && virtualPrice
        ? CurrencyAmount.fromRawAmount(token, virtualPrice.toString())
        : undefined,
    [token, virtualPrice]
  );
}
