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

export function TransactionSummary({ info }: { info: TransactionInfo }) {
  switch (info.type) {
    case TransactionType.APPROVAL:
      return <ApprovalAlertContent {...info} />;
    case TransactionType.DEPOSIT:
      return <DepositAlertContent {...info} />;
    case TransactionType.WITHDRAW:
      return <WithdrawAlertContent {...info} />;
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

function ApprovalAlertContent({ tokenAddress }: ApproveTransactionInfo) {
  const token = useToken(tokenAddress);
  return <p>Approved {token?.symbol}</p>;
}

function DepositAlertContent({ currencyId, amountRaw }: DepositTransactionInfo) {
  return (
    <p>
      Deposit{' '}
      <FormattedCurrencyAmountManaged rawAmount={amountRaw} sigFigs={3} currencyId={currencyId} />
    </p>
  );
}
function WithdrawAlertContent({ currencyId, amountRaw }: WithdrawTransactionInfo) {
  return (
    <p>
      Withdraw{' '}
      <FormattedCurrencyAmountManaged rawAmount={amountRaw} sigFigs={3} currencyId={currencyId} />
    </p>
  );
}
