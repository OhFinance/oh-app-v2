import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import { parseUnits } from 'ethers/lib/utils';
import JSBI from 'jsbi';
import { ReactNode, useCallback, useMemo } from 'react';
import { banks } from '~/constants/banks';
import { useActiveWeb3React } from '~/hooks/web3';
import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCurrencyBalances } from '../wallet/hooks';
import { Field, typeInput } from './reducer';

export function useStakeState(): AppState['stake'] {
  return useAppSelector((state) => state.stake);
}

export function useStakeActionHandlers(): {
  onUserInput: (field: Field, typedValue: string) => void;
} {
  const dispatch = useAppDispatch();

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }));
    },
    [dispatch]
  );

  return {
    onUserInput,
  };
}

// try to parse a user entered amount for a given token
export function tryParseAmount<T extends Currency>(
  value?: string,
  currency?: T
): CurrencyAmount<T> | undefined {
  if (!value || !currency) {
    return undefined;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== '0') {
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
}

// TEMP
export function useDepositCurrency() {
  const { chainId } = useActiveWeb3React();
  return chainId ? banks[0].underlyingTokenMap[chainId] : undefined;
}

export function useWithdrawCurrency() {
  const { chainId } = useActiveWeb3React();
  return chainId ? banks[0].ohTokenMap[chainId] : undefined;
}

export function useDerivedStakeInfo() {
  const { account } = useActiveWeb3React();

  const {
    [Field.DEPOSIT]: { typedValue: depositTypedValue },
    [Field.WITHDRAW]: { typedValue: withdrawTypedValue },
  } = useStakeState();

  const depositCurrency = useDepositCurrency();
  const withdrawCurrency = useWithdrawCurrency();

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    depositCurrency ?? undefined,
    withdrawCurrency ?? undefined,
  ]);

  const parsedAmounts = useMemo(
    () => ({
      [Field.DEPOSIT]: tryParseAmount(depositTypedValue, depositCurrency || undefined) ?? undefined,
      [Field.WITHDRAW]:
        tryParseAmount(withdrawTypedValue, withdrawCurrency || undefined) ?? undefined,
    }),
    [depositTypedValue, withdrawTypedValue, depositCurrency, withdrawCurrency]
  );

  const currencyBalances = {
    [Field.DEPOSIT]: relevantTokenBalances[0],
    [Field.WITHDRAW]: relevantTokenBalances[1],
  };

  const currencies: { [field in Field]?: Currency | null } = {
    [Field.DEPOSIT]: depositCurrency,
    [Field.WITHDRAW]: withdrawCurrency,
  };

  let inputError:
    | {
        [Field.DEPOSIT]?: ReactNode | undefined;
        [Field.WITHDRAW]?: ReactNode | undefined;
      }
    | undefined;

  if (!account) {
    inputError = {
      [Field.DEPOSIT]: 'Connect a Wallet',
      [Field.WITHDRAW]: 'Connect a Wallet',
    };
  }

  if (!parsedAmounts[Field.WITHDRAW]) {
    inputError = { ...inputError, [Field.WITHDRAW]: 'Enter an amount' };
  }

  if (!parsedAmounts[Field.DEPOSIT]) {
    inputError = { ...inputError, [Field.DEPOSIT]: 'Enter an amount' };
  }

  if (
    parsedAmounts[Field.DEPOSIT] !== undefined &&
    currencyBalances[Field.DEPOSIT]?.lessThan(parsedAmounts[Field.DEPOSIT] as CurrencyAmount<Token>)
  ) {
    inputError = { ...inputError, [Field.DEPOSIT]: 'Insufficient Balance' };
  }

  if (
    parsedAmounts[Field.WITHDRAW] !== undefined &&
    currencyBalances[Field.WITHDRAW]?.lessThan(
      parsedAmounts[Field.WITHDRAW] as CurrencyAmount<Token>
    )
  ) {
    inputError = { ...inputError, [Field.WITHDRAW]: 'Insufficient Balance' };
  }

  return {
    currencies,
    currencyBalances,
    parsedAmounts,
    inputError,
  };
}
