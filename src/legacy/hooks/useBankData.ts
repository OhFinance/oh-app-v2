import BigNumber from 'bignumber.js';
import { useBankContract } from 'hooks/useContract';
import useTotalSupply from 'hooks/useTotalSupply';
import { useCallback, useMemo } from 'react';
import { useSingleCallResult } from 'state/multicall/hooks';
import { TEN, ZERO } from 'utils/bigNumber';

export const useBankData = (bankAddress: string) => {
  const bank = useBankContract(bankAddress);
  const totalSupply = useTotalSupply(bankAddress);
  const virtualPriceResult = useSingleCallResult(bank, 'virtualPrice').result;
  const virtualBalanceResult = useSingleCallResult(bank, 'virtualBalance').result;

  const virtualPrice = useMemo(
    () =>
      bankAddress && virtualPriceResult ? new BigNumber(virtualPriceResult.toString()) : undefined,
    [bankAddress, virtualPriceResult]
  );

  const virtualBalance = useMemo(
    () =>
      bankAddress && virtualBalanceResult
        ? new BigNumber(virtualBalanceResult.toString())
        : undefined,
    [bankAddress, virtualBalanceResult]
  );

  // get rate of underlying:oh-underlying token
  const getTokenValue = useCallback(
    (tokens: BigNumber) => {
      return bankAddress && totalSupply && virtualBalance
        ? !totalSupply.eq(0)
          ? new BigNumber(tokens).times(totalSupply).div(virtualBalance)
          : new BigNumber(tokens).times(1)
        : undefined;
    },
    [bankAddress, totalSupply, virtualBalance]
  );

  const getShareValue = useCallback(
    (shares: BigNumber, decimals = 18) => {
      return bankAddress && virtualPrice
        ? new BigNumber(shares).times(virtualPrice).div(TEN.pow(decimals))
        : undefined;
    },
    [bankAddress, virtualPrice]
  );

  // get % ownership of bank given shares
  const getTotalBankShare = useCallback(
    (shares: BigNumber) => {
      return bankAddress && totalSupply
        ? !totalSupply.eq(0)
          ? shares.div(totalSupply.plus(shares)).times(100)
          : 100
        : undefined;
    },
    [bankAddress, totalSupply]
  );

  return {
    virtualBalance,
    virtualPrice,
    getTokenValue,
    getShareValue,
    getTotalBankShare,
  };
};
