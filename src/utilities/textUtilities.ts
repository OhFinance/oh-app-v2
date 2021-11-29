export function limitDecimals(value: number, maxDecimals = 2) {
  const strValue = value.toString();
  const index = strValue.indexOf('.');
  const isDecimal = index !== -1;
  if (!isDecimal) {
    return strValue;
  }
  return strValue.slice(0, index + maxDecimals + 1);
}

export function formatCurrency(value: number, maxDecimals = 2) {
  // TODO: add commas every 3 digits
  // TODO: include '.' if maxDecimals > 0
  const strValue = value.toString();
  const index = strValue.indexOf('.');
  const isDecimal = index !== -1;
  if (!isDecimal) {
    return strValue;
  }
  return strValue.slice(0, index + maxDecimals);
}
