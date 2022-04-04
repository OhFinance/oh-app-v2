export enum ModalView {
  DEPOSIT = 0,
  DEPOSITING = 1,
  DEPOSIT_COMPLETE = 2,
  DEPOSIT_ERROR = 3,

  WITHDRAW = 4,
  WITHDRAWING = 5,
  WITHDRAW_COMPLETE = 6,
  WITHDRAW_ERROR = 7,
}

export { default as DepositView } from './DepositView';
