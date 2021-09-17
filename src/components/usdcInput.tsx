import { useEffect, useState } from 'react';
import styles from './__styles__/usdcInput.module.css';

type Props = {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export function UsdcInput(props: Props) {
  const { value, maxValue, onChange, disabled } = props;
  const [lastValue, setLastValue] = useState(value);
  const [proxyValue, setProxyValue] = useState(value ? value.toString() : '');

  useEffect(() => {
    if (value !== lastValue) {
      setLastValue(value);
      setProxyValue(value ? value.toString() : '');
    }
  }, [value, lastValue, setLastValue, setProxyValue]);

  return (
    <>
      <div className="w-full bg-inputBG rounded-lg w-full flex flex-row">
        <button
          onClick={() => onChange(maxValue)}
          className={`w-16 text-xl text-pink-800 pl-2 pr-2 underline`}
          disabled={disabled}
        >
          MAX
        </button>
        <input
          className={`w-full h-9 ml-1 text-xl text-pink-800 ${styles['usdc-input']}`}
          value={proxyValue}
          onChange={(event) => {
            if (event.target.value === '') {
              setProxyValue('');
              onChange(0);
              return;
            }
            const value = parseFloat(event.target.value);
            const isCompleteDecimal = event.target.value.split('.')[1];
            if (!isNaN(value) && isCompleteDecimal?.length > 0) {
              const finalValue = Math.min(value, maxValue);
              onChange(finalValue);
              setProxyValue(finalValue.toString());
              return;
            }
            setProxyValue(event.target.value);
          }}
          disabled={disabled}
          type="text"
        ></input>
        <p className={`w-24 text-xl text-pink-800 p-1 pl-2 mr-2`}>USDC</p>
      </div>
    </>
  );
}
