import BigNumber from 'bignumber.js';
import { TEN } from './bigNumber';

export const getDecimalAmount = (amount: BigNumber | string | number, decimals = 18) => {
  return new BigNumber(amount).times(TEN.pow(decimals));
};

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(TEN.pow(decimals));
};

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, decimalsToAppear = 3) => {
  return new BigNumber(balance).dividedBy(TEN.pow(decimals)).toFixed(decimalsToAppear, 1); // 1 = round down
};

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};
