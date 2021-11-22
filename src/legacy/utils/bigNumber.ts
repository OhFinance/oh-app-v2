import BigNumber from 'bignumber.js';

export const ZERO = new BigNumber(0);
export const TEN = new BigNumber(10);
export const DEFAULT_DECIMALS = TEN.pow(18);
export const MAX_UINT256 = new BigNumber(2).pow(256).minus(1);
