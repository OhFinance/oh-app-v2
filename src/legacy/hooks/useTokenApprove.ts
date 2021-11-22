import { TransactionResponse } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';
import { useHasPendingApproval, useTransactionAdder } from 'state/transactions/hooks';
import { useApprovalManager } from 'state/user/hooks';
import { MAX_UINT256 } from 'utils/bigNumber';
import { useCallWithGasPrice } from './useCallWithGasPrice';
import { useERC20Contract } from './useContract';
import { useTokenAllowance } from './useTokenAllowance';
import { useWeb3 } from './useWeb3';

export enum ApprovalState {
  UNKNOWN = 'Unknown',
  NOT_APPROVED = 'Not Approved',
  PENDING = 'Pending',
  APPROVED = 'Approved',
}

export const useTokenApprove = (
  tokenAddress?: string,
  spender?: string,
  symbol?: string,
  amountToApprove?: BigNumber
) => {
  const { account } = useWeb3();

  if (account == null) {
    throw new Error('account cannot be null');
  }

  const contract = useERC20Contract(tokenAddress);
  const allowance = useTokenAllowance(tokenAddress, account, spender);

  const callWithGasPrice = useCallWithGasPrice();
  const addTransaction = useTransactionAdder();
  const [isExactApproval] = useApprovalManager();
  const pendingApproval = useHasPendingApproval(tokenAddress, spender);

  const approvalState: ApprovalState = useMemo(() => {
    if (!tokenAddress || !spender || !allowance) {
      return ApprovalState.UNKNOWN;
    }

    return allowance.lt(amountToApprove ?? 0)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, allowance, pendingApproval, spender, tokenAddress]);

  const handleApprove = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    if (!tokenAddress) {
      console.error('no token');
      return;
    }

    if (!contract) {
      console.error('tokenContract is null');
      return;
    }

    if (!spender) {
      console.error('no spender');
      return;
    }

    return callWithGasPrice(contract, 'approve', [
      spender,
      isExactApproval ? String(amountToApprove ?? 0) : MAX_UINT256.toString(),
    ])
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Approve ${symbol ?? 'Token'}`,
          approval: { tokenAddress, spender },
        });
      })
      .catch((error: Error) => {
        console.error('Failed to approve token', error);
        throw error;
      });
  }, [
    addTransaction,
    amountToApprove,
    approvalState,
    callWithGasPrice,
    contract,
    isExactApproval,
    spender,
    symbol,
    tokenAddress,
  ]);

  return { approvalState, onApprove: handleApprove };
};
