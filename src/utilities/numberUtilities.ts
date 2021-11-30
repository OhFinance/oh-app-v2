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

export function formatCurrency(value: number, maxDecimals = 2) {
  return numberWithCommas(limitDecimals(value, maxDecimals));
}

// https://stackoverflow.com/a/2901298
export function numberWithCommas(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
