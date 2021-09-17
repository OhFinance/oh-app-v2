import { useState } from 'react';
import styles from './__styles__/usdcInput.module.css';

type Props = { maxValue: number; onChange: (value: number) => void; disabled?: boolean };

export function UsdcInput(props: Props) {
  const { maxValue, onChange, disabled } = props;
  const [value, setValue] = useState(0);

  return (
    <>
      <div className="w-full bg-inputBG rounded-lg w-full flex flex-row">
        <button
          onClick={() => setValue(maxValue)}
          className={`w-16 text-xl text-pink-800 pl-2 pr-2 underline`}
          disabled={disabled}
        >
          MAX
        </button>
        <input
          className={`w-full h-9 ml-1 text-xl text-pink-800 ${styles['usdc-input']}`}
          value={value}
          onChange={(event) => {
            if (event.target.value === '') {
              setValue(0);
              onChange(0);
              return;
            }
            const value = parseInt(event.target.value);
            if (!isNaN(value)) {
              setValue(Math.min(value, maxValue));
              onChange(value);
            }
          }}
          disabled={disabled}
        ></input>
        <p className={`w-24 text-xl text-pink-800 p-1 pl-2 mr-2`}>USDC</p>
      </div>
    </>
  );
}
