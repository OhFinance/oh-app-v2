import { useCallback, useEffect, useMemo } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { retry, RetryableError, RetryOptions } from '../../utilities/retry';
import { useAddAlertCallback, useBlockNumber } from '../application/hooks';
import { updateBlockNumber } from '../application/reducer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { checkedTransaction, finalizeTransaction } from './actions';
import { TransactionSummary } from './alertContents';

interface TxInterface {
  addedTime: number;
  receipt?: Record<string, any>;
  lastCheckedBlockNumber?: number;
}

export function shouldCheck(lastBlockNumber: number, tx: TxInterface): boolean {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 1, minWait: 0, maxWait: 0 };

export default function Updater(): null {
  const { chainId, library } = useActiveWeb3React();

  const addAlert = useAddAlertCallback();
  const lastBlockNumber = useBlockNumber();

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.transactions);

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state]);

  const getReceipt = useCallback(
    (hash: string) => {
      if (!library || !chainId) throw new Error('No library or chainId');
      const retryOptions = DEFAULT_RETRY_OPTIONS;
      return retry(
        () =>
          library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug('Retrying for hash', hash);
              throw new RetryableError();
            }
            return receipt;
          }),
        retryOptions
      );
    },
    [chainId, library]
  );

  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return;

    const cancels = Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .map((hash) => {
        const txInfo = transactions[hash];
        addAlert(null, {
          severity: 'success',
          title: 'Transaction',
          content: <TransactionSummary info={txInfo.info} awaiting />,
          hash,
        });
        const { promise, cancel } = getReceipt(hash);
        promise
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              );
              const txInfo = transactions[hash];

              addAlert(null, {
                severity: 'success',
                title: 'Transaction',
                content: <TransactionSummary info={txInfo.info} />,
                hash,
              });
              // addPopup(
              //   {
              //     txn: {
              //       hash,
              //     },
              //   },
              //   hash,
              //   DEFAULT_TXN_DISMISS_MS
              // );

              // the receipt was fetched before the block, fast forward to that block to trigger balance updates
              if (receipt.blockNumber > lastBlockNumber) {
                dispatch(updateBlockNumber({ chainId, blockNumber: receipt.blockNumber }));
              }
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }));
            }
          })
          .catch((error) => {
            if (!error.isCancelledError) {
              console.error(`Failed to check transaction hash: ${hash}`, error);
            }
          });
        return cancel;
      });

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [chainId, library, transactions, lastBlockNumber, dispatch, addAlert, getReceipt]);

  return null;
}
