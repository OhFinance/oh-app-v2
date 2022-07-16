import { Currency } from '@uniswap/sdk-core';
import Button from 'components/Button';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { formatCurrencyAmount } from 'utilities/formatCurrencyAmount';
import { useActiveWeb3React } from '~/hooks/web3';
import { useCurrencyBalance } from '~/state/wallet/hooks';
import { escapeRegExp } from '~/utilities';

const Container = styled.div(({ theme }) => ({
  position: 'relative',
  width: '100%',
}));
const Balance = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.grey,
  fontSize: '14px',
  lineHeight: '16px',
  textAlign: 'right',
  padding: '0px 0px 8px',
  '& span': {
    color: theme.white,
  },
}));

const InputContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: theme.inputBG,
  boxSizing: 'border-box',
}));

const Content = styled.div(({ theme }) => ({
  display: 'flex',
  ...theme.flexRowNoWrap,
  padding: '16px 20px 17px 20px',
  width: '100%',
}));

const Input = styled.input(({ theme }) => ({
  boxSizing: 'content-box',
  border: 'none',
  outline: 'none',
  background: 'none',
  color: '#A4AADF',
  fontSize: '20px',
  flex: '0 1 auto',
  minWidth: '220px',
  width: '100%',
  paddingRight: '60px',
}));

const Symbol = styled.img(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: 50,
  marginRight: '8px',
  boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.14)',
}));

const MaxButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  marginRight: -8,
  alignSelf: 'center',
  padding: '12px 17px 13px 17px',
  fontSize: '12px',
  fontWeight: 600,
}));

interface CurrencyInputProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton?: boolean;
  currency?: Currency | null;
  id?: string;
  logoUrl?: string;
  style?: React.CSSProperties;
  hideAvailableBalance?: boolean;
  onReset?: () => void;
  disabled?: boolean;
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export function CurrencyInput({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  currency,
  logoUrl,
  style,
  hideAvailableBalance,
  onReset,
  disabled,
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
    <Container style={style}>
      {hideAvailableBalance || (
        <Balance>
          Available Balance <span>{formatCurrencyAmount(selectedCurrencyBalance, 4)}</span>
        </Balance>
      )}
      <InputContainer>
        <Content>
          {logoUrl && <Symbol src={logoUrl} alt="placeholder" />}
          <Input
            value={value}
            onChange={(event) => {
              enforcer(event.target.value.replace(/,/g, '.'));
            }}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={'Enter amount'}
            minLength={1}
            maxLength={79}
            spellCheck="false"
            disabled={disabled}
          />
        </Content>
        {onReset ? (
          <MaxButton onClick={onReset}>RESET</MaxButton>
        ) : (
          showMaxButton && (
            <MaxButton size="small" onClick={onMax}>
              MAX
            </MaxButton>
          )
        )}
      </InputContainer>
      {/* <div ref={inputRef} className="w-full bg-inputBG rounded-lg w-full flex flex-row">
   
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
      </div> */}
    </Container>
  );
}
