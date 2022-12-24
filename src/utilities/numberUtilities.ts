import { BigNumber, BigNumberish } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

export function limitDecimals(value: number, maxDecimals = 2) {
  const strValue = value.toString();
  const index = strValue.indexOf('.');
  const isDecimal = index !== -1;
  if (!isDecimal) {
    return strValue;
  }
  if (maxDecimals === 0) {
    return strValue.slice(0, index);
  }
  return strValue.slice(0, index + maxDecimals + 1);
}

export function limitDecimalsWithCommas(value: number, maxDecimals = 2) {
  return numberWithCommas(limitDecimals(value, maxDecimals));
}

// https://stackoverflow.com/a/2901298
export function numberWithCommas(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatBigNumberToFixed = (number?: BigNumber, displayDecimals = 2, decimals = 18) => {
  const formattedString = formatUnits(number ?? 0, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

export const scalePrice = (price: number, decimals: number) => {
  const scaledPrice = Math.floor(100_000_000 * price);
  return parseUnits(scaledPrice.toString(), decimals).div(100_000_000);
};

const ONE = BigNumber.from(1);
const TWO = BigNumber.from(2);

export const sqrt = (value: BigNumberish) => {
  const x = BigNumber.from(value);
  let z = x.add(ONE).div(TWO);
  let y = x;
  while (z.sub(y).isNegative()) {
    y = z;
    z = x.div(z).add(z).div(TWO);
  }
  return y;
};
