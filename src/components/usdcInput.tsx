import { useState } from 'react';
import styles from './__styles__/usdcInput.module.css';

type Props = { maxValue: number; onChange: (value: number) => void; disabled?: boolean };

export function UsdcInput(props: Props) {
  const { maxValue, onChange, disabled } = props;
  const [value, setValue] = useState('');

  return (
    <>
      <div className="w-full bg-pink-800 bg-opacity-25 rounded-lg w-full flex flex-row">
        <button
          onClick={() => setValue(maxValue.toString())}
          className={`w-auto text-xl text-pink-800 pl-2 pr-2 underline`}
          disabled={disabled}
        >
          MAX
        </button>
        <input
          className={`w-36 h-9 ml-1 text-xl text-pink-800 ${styles['usdc-input']}`}
          value={value}
          onChange={(event) => {
            if (event.target.value === '') {
              setValue('');
              onChange(0);
              return;
            }
            const value = parseInt(event.target.value);
            if (!isNaN(value)) {
              setValue(String(Math.min(value, maxValue)));
              onChange(value);
            }
          }}
          disabled={disabled}
        ></input>
        <p className={`w-auto text-xl text-pink-800 p-1 pl-2 pr-2`}>USDC</p>
      </div>
    </>
  );
}
