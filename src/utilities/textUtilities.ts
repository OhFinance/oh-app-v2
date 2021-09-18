export function limitDecimals(value: number, maxDecimals = 2) {
  const strValue = value.toString();
  const index = strValue.indexOf('.');
  const isDecimal = index !== -1;
  if (!isDecimal) {
    return strValue;
  }
  return strValue.slice(0, index + maxDecimals + 1);
}
