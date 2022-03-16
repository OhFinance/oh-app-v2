import { Fraction } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import React from 'react';
import { useCurrency, useToken } from '~/hooks/Tokens';
import {
  ApproveTransactionInfo,
  DepositTransactionInfo,
  TransactionInfo,
  TransactionType,
  WithdrawTransactionInfo,
} from './actions';

export function TransactionSummary({
  info,
  awaiting,
}: {
  info: TransactionInfo;
  awaiting?: boolean;
}) {
  if (awaiting) {
    switch (info.type) {
      case TransactionType.APPROVAL:
        return <ApprovalAlertContent {...info} awaiting={awaiting} />;
      case TransactionType.DEPOSIT:
        return <DepositAlertContent {...info} awaiting={awaiting} />;
      case TransactionType.WITHDRAW:
        return <WithdrawAlertContent {...info} awaiting={awaiting} />;
    }
  } else {
    switch (info.type) {
      case TransactionType.APPROVAL:
        return <ApprovalAlertContent {...info} />;
      case TransactionType.DEPOSIT:
        return <DepositAlertContent {...info} />;
      case TransactionType.WITHDRAW:
        return <WithdrawAlertContent {...info} />;
    }
  }
}

function formatAmount(amountRaw: string, decimals: number, sigFigs: number): string {
  return new Fraction(
    amountRaw,
    JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
  ).toSignificant(sigFigs);
}

function FormattedCurrencyAmount({
  rawAmount,
  symbol,
  decimals,
  sigFigs,
}: {
  rawAmount: string;
  symbol: string;
  decimals: number;
  sigFigs: number;
}) {
  return (
    <>
      {formatAmount(rawAmount, decimals, sigFigs)} {symbol}
    </>
  );
}

function FormattedCurrencyAmountManaged({
  rawAmount,
  currencyId,
  sigFigs = 6,
}: {
  rawAmount: string;
  currencyId: string;
  sigFigs: number;
}) {
  const currency = useCurrency(currencyId);
  return currency ? (
    <FormattedCurrencyAmount
      rawAmount={rawAmount}
      decimals={currency.decimals}
      sigFigs={sigFigs}
      symbol={currency.symbol ?? '???'}
    />
  ) : null;
}

function ApprovalAlertContent({
  tokenAddress,
  awaiting = false,
}: ApproveTransactionInfo & { awaiting?: boolean }) {
  const token = useToken(tokenAddress);
  if (awaiting) {
    return <p>Confirming approval for {token?.symbol}...</p>;
  }
  return <p>Approved {token?.symbol}</p>;
}

function DepositAlertContent({
  currencyId,
  amountRaw,
  awaiting,
}: DepositTransactionInfo & { awaiting?: boolean }) {
  if (awaiting) {
    return (
      <p>
        Confirming{' '}
        <FormattedCurrencyAmountManaged rawAmount={amountRaw} sigFigs={3} currencyId={currencyId} />{' '}
        Deposit...
      </p>
    );
  }
  return (
    <p>
      Deposited{' '}
      <FormattedCurrencyAmountManaged rawAmount={amountRaw} sigFigs={3} currencyId={currencyId} />
    </p>
  );
}
function WithdrawAlertContent({
  currencyId,
  amountRaw,
  awaiting,
}: WithdrawTransactionInfo & { awaiting?: boolean }) {
  if (awaiting) {
    return (
      <p>
        Confirming{' '}
        <FormattedCurrencyAmountManaged rawAmount={amountRaw} sigFigs={3} currencyId={currencyId} />{' '}
        Withdrawal...
      </p>
    );
  }
  return (
    <p>
      Withdraw{' '}
      <FormattedCurrencyAmountManaged rawAmount={amountRaw} sigFigs={3} currencyId={currencyId} />
    </p>
  );
}
