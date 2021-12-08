import { Currency } from '@uniswap/sdk-core';
import React, { useRef } from 'react';
import { useActiveWeb3React } from '~/hooks/web3';
import { useCurrencyBalance } from '~/state/wallet/hooks';
import { escapeRegExp } from '~/utilities';
import styles from '../__styles__/usdcInput.module.css';

interface CurrencyInputProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton?: boolean;
  currency?: Currency | null;
  id: string;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export function CurrencyInput({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  currency,
  id,
}: CurrencyInputProps) {
  const { account } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);
  const inputRef = useRef(null as null | HTMLDivElement);

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };
  return (
    <>
      <div ref={inputRef} className="w-full bg-inputBG rounded-lg w-full flex flex-row">
        {/* {!walletConnected && (
          <CaptureResize captureRef={inputRef}>
            {({ width, height }) => (
              <div
                className={`flex flex-col absolute bg-black bg-opacity-50 z-10 items-center justify-center`}
                style={{ width, height }}
              ></div>
            )}
          </CaptureResize>
        )} */}
        {showMaxButton && selectedCurrencyBalance && (
          <button onClick={onMax} className={`w-16 text-xl text-pink-800 pl-2 pr-2 underline`}>
            MAX
          </button>
        )}
        <input
          className={`w-full h-9 ml-1 text-xl text-pink-800 ${styles['usdc-input']}`}
          value={value}
          onChange={(event) => {
            enforcer(event.target.value.replace(/,/g, '.'));
          }}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder={'0.0'}
          minLength={1}
          maxLength={79}
          spellCheck="false"
        ></input>
        {currency && (
          <p className={`w-24 text-md text-pink-800 p-1 pl-2 mr-2 whitespace-nowrap`}>
            {currency.symbol}
          </p>
        )}
      </div>
    </>
  );
}
