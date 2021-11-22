import { getAddress } from '@ethersproject/address';

export const isValidAddress = (value: any): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};

export const getDisplayAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(38);
};
