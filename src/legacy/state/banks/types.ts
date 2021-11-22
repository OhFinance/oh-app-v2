export interface APYData {
  apy?: number;
  timespan_days?: number;
}

export interface BankData {
  apys?: APYData[];
}

export interface BankStore {
  [bank: string]: BankData;
}
