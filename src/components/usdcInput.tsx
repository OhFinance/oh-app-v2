import React, { useEffect, useRef, useState } from 'react';
import { useWalletStore } from '~/stores/useWalletStore';
import { CaptureResize } from './captureResize';
import styles from './__styles__/usdcInput.module.css';

type Props = {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
  onValidate?: (isValid: boolean) => void;
  disabled?: boolean;
  type?: 'number' | 'text';
};

export function UsdcInput(props: Props) {
  const { value, maxValue, onChange, onValidate, disabled } = props;
  const [lastValue, setLastValue] = useState(value);
  const [proxyValue, setProxyValue] = useState(value ? value.toString() : '');
  const { walletConnected } = useWalletStore();
  const inputRef = useRef(null as null | HTMLDivElement);

  useEffect(() => {
    if (value !== lastValue) {
      setLastValue(value);
      setProxyValue(value ? value.toString() : '');
    }
    const isDecimal = proxyValue.indexOf('.') !== -1;
    const isCompleteDecimal = isDecimal ? proxyValue.split('.')[1]?.length > 0 : false;
    onValidate?.(value === Number(proxyValue) && (!isDecimal || isCompleteDecimal));
  }, [value, lastValue, proxyValue, onValidate, setLastValue, setProxyValue]);

  return (
    <>
      <div ref={inputRef} className="w-full bg-inputBG rounded-lg w-full flex flex-row">
        {!walletConnected && (
          <CaptureResize captureRef={inputRef}>
            {({ width, height }) => (
              <div
                className={`flex flex-col absolute bg-black bg-opacity-50 z-10 items-center justify-center`}
                style={{ width, height }}
              ></div>
            )}
          </CaptureResize>
        )}
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
            const isDecimal = event.target.value.indexOf('.') !== -1;
            const isCompleteDecimal = isDecimal
              ? event.target.value.split('.')[1]?.length > 0
              : false;
            if (!isNaN(value) && (!isDecimal || isCompleteDecimal)) {
              const finalValue = Math.min(value, maxValue);
              setProxyValue(finalValue.toString());
              onChange(finalValue);
              return;
            }
            setProxyValue(event.target.value.replace(/[^\d.-]/g, ''));
          }}
          disabled={disabled}
          type="text"
        ></input>
        <p className={`w-24 text-xl text-pink-800 p-1 pl-2 mr-2`}>USDC</p>
      </div>
    </>
  );
}
