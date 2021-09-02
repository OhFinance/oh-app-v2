import { useState } from 'react';
import styles from './__styles__/usdcInput.module.css';

export function UsdcInput(props: { maxValue: number; onChange: (value: number) => void }) {
  const { maxValue, onChange } = props;
  const [value, setValue] = useState('');

  return (
    <>
      <input
        className={styles['usdc-input']}
        value={value}
        onChange={(event) => {
          if (event.target.value === '') {
            setValue('');
            onChange(0);
            return;
          }
          const value = parseInt(event.target.value);
          if (!isNaN(value)) {
            setValue(String(value));
            onChange(value);
          }
        }}
      ></input>
    </>
  );
}
