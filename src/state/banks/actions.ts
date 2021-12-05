import { APYData } from './types';

export interface SetBankAPY {
  chainId: number;
  address: string;
  apys: APYData[];
}
