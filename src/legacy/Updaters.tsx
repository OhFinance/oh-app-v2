import { Fragment } from 'react';
import { BankUpdater } from 'state/banks/updater';
import { MulticallUpdater } from 'state/multicall/updater';
import { TransactionUpdater } from 'state/transactions/updater';

export const Updaters = () => {
  return (
    <Fragment>
      <BankUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </Fragment>
  );
};
