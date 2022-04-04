import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import Button from 'components/Button';
import { CurrencyInput } from 'components/CurrencyInput';
import { Bank } from 'constants/banks';
import { SupportedChainId } from 'constants/chains';
import { useVirtualBalance } from 'hooks/calls/bank/useVirtualBalance';
import { useVirtualPrice } from 'hooks/calls/bank/useVirtualPrice';
import { useBankContract } from 'hooks/contracts/useBankContract';
import { ApprovalState, useApproveCallback } from 'hooks/transactionCallbacks/useApproveCallback';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Flex } from 'rebass';
import { useBankAPYData } from 'state/banks/hooks';
import { useDerivedStakeInfo, useStakeActionHandlers, useStakeState } from 'state/stake/hooks';
import { Field } from 'state/stake/reducer';
import { TransactionType } from 'state/transactions/actions';
import { useTransactionAdder } from 'state/transactions/hooks';
import styled from 'styled-components';
import { calculateGasMargin } from 'utilities/calculateGasMargin';
import { currencyId } from 'utilities/currencyId';
import { useActiveWeb3React } from '~/hooks/web3';

const ContainerBase = styled.div(({ theme }) => ({
  backgroundColor: theme.bg1,
  borderRadius: 20,
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: 'inset 0px 0px 50px #001F71',
  padding: 20,
}));

const Logo = styled.img<{ size?: 'small' | 'big' }>(({ size }) => ({
  width: size && size === 'small' ? 24 : 50,
  height: size && size === 'small' ? 24 : 50,
  boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.14)',
}));

const DepositContainer = styled(ContainerBase)({ padding: 20 });

const CardTokenTitle = styled.div({
  paddingLeft: 16,
});

// change for themed h2
const Symbol = styled.h2({
  fontSize: '28px',
  lineHeight: '28px',
  fontWeight: 500,
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
});

const SubHeading = styled.h4({
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.87)',
  fontWeight: 500,
  lineHeight: '14px',
  margin: 0,
});

const APRContainer = styled.div(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '17px 20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  backgroundColor: theme.bg2,
  borderRadius: 20,
  marginTop: 30,
  marginBottom: 10,
}));

const TitleText = styled.h5(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '20px',
  margin: 0,
  fontWeight: 500,
}));

const APRTitle = styled(TitleText)(({ theme }) => ({
  color: theme.grey,
}));

const APRValue = styled.h3(({ theme }) => ({
  fontSize: '36px',
  lineHeight: '36px',
  color: theme.white,
  margin: 0,
  fontWeight: 600,
  textAlign: 'right',
}));

const Stat = styled.p(({ theme }) => ({
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

const OverflowingButton = styled(Button)({
  position: 'relative',
});

export default function DepositCard({ bank, field }: { bank: Bank; field: Field }) {
  const { account, chainId, library } = useActiveWeb3React();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonHeight, setButtonHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const current = buttonRef.current;
    if (current && buttonHeight === undefined) {
      const height = current.getBoundingClientRect().height;
      setButtonHeight(height);
    }
  }, [buttonRef, buttonHeight]);

  const { currencies, currencyBalances, inputError, parsedAmounts } = useDerivedStakeInfo(bank);
  const { onUserInput } = useStakeActionHandlers();
  const {
    [Field.DEPOSIT]: { typedValue: depositTypedValue },
    [Field.WITHDRAW]: { typedValue: withdrawTypedValue },
  } = useStakeState();

  const handleType = useCallback(
    (value: string) => {
      onUserInput(field, value);
    },
    [onUserInput]
  );

  const handleMax = useCallback(
    (field: Field) => {
      const balance = currencyBalances[field];
      balance && onUserInput(field, balance.toExact());
    },
    [currencyBalances, onUserInput]
  );

  const isValidDeposit = !inputError || !inputError[Field.DEPOSIT];

  // START APPROVAL
  const [approvalState, approveCallback] = useApproveCallback(
    parsedAmounts[Field.DEPOSIT],
    bank.contractAddress
  );

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);

  const showApproveFlow =
    !inputError?.[Field.DEPOSIT] &&
    field !== Field.WITHDRAW &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED));

  // END APPROVAL

  // Start Statistics (TVL, Share Price, APY)
  const totalValueLocked = useVirtualBalance(bank.ohToken);
  const sharePrice = useVirtualPrice(bank.ohToken);
  const apys = useBankAPYData(bank.ohToken.chainId, bank.ohToken.address);
  const apyString = useMemo(() => {
    if (apys && apys[0]) {
      return `${apys[0].apy?.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}%`;
    }
    return 'loading...';
  }, [apys]);
  // END STATISTICS

  const bankContract = useBankContract(bank.contractAddress);
  const addTransaction = useTransactionAdder();

  // TODO: open deposit modal
  const onDeposit = useCallback(
    async (field: Field) => {
      let parsedAmount = parsedAmounts[field];
      let currency = currencies[field];

      if (!chainId || !library || !account || !bankContract || !parsedAmount || !currency) return;

      let estimate = bankContract.estimateGas.deposit;

      let method = bankContract.deposit;

      estimate(parsedAmount.quotient.toString())
        .then((estimatedGasLimit) =>
          method((parsedAmount as CurrencyAmount<Token>).quotient.toString(), {
            gasLimit:
              chainId === SupportedChainId.MOONRIVER
                ? 5000000
                : calculateGasMargin(estimatedGasLimit),
          }).then((response) => {
            // setAttemptingTx(false)
            addTransaction(response, {
              type: TransactionType.DEPOSIT,
              currencyId: currencyId(currency as Currency),
              amountRaw: (parsedAmount as CurrencyAmount<Token>).quotient.toString(),
            });
          })
        )
        .catch((error) => {
          if (error?.code !== 4001) {
            console.error(error);
          }
        });
    },
    [chainId, library, account, parsedAmounts, currencies, addTransaction, bankContract]
  );

  if (!bank) {
    return <h1>Not a bank</h1>;
  }
  return (
    <DepositContainer
      style={
        buttonHeight !== undefined
          ? {
              marginBottom: `${buttonHeight / 2}px`,
            }
          : undefined
      }
    >
      <Flex alignItems={'center'}>
        <Logo src={bank.image} alt="placeholder" />
        <CardTokenTitle>
          <Symbol>{bank.ohToken.symbol}</Symbol>
          {field === Field.DEPOSIT && (
            <SubHeading>Deposit {bank.underlyingToken.symbol} to earn yield</SubHeading>
          )}
        </CardTokenTitle>
      </Flex>
      {field === Field.DEPOSIT && (
        <>
          <APRContainer>
            <APRTitle>
              <span style={{ fontSize: '14px' }}>Earning Rate</span>
              <br /> APY
            </APRTitle>
            <APRValue>{apyString}</APRValue>
          </APRContainer>
          <Stat>
            TVL{' '}
            <span>
              ${totalValueLocked ? totalValueLocked.toFixed(2, { groupSeparator: ',' }) : '---'}
            </span>
          </Stat>
          <Stat>
            Share Price{' '}
            <span>${sharePrice ? sharePrice.toFixed(3, { groupSeperator: ',' }) : '---'}</span>
          </Stat>
        </>
      )}
      <CurrencyInput
        logoUrl={
          field === Field.WITHDRAW
            ? bank.image
            : `/img/tokens/${bank.underlyingToken.address.toLowerCase()}.png`
        }
        value={field === Field.DEPOSIT ? depositTypedValue : withdrawTypedValue}
        id={`input-${bank.contractAddress}`}
        currency={currencies[field]}
        onUserInput={handleType}
        onMax={() => handleMax(field)}
        style={
          buttonHeight !== undefined
            ? {
                bottom: `-${buttonHeight / 2 + 12}px`,
                marginTop: `-${buttonHeight / (2 + 12) - (field === Field.DEPOSIT ? 30 : 0)}px`,
              }
            : undefined
        }
        showMaxButton
      />
      {!account ? (
        <OverflowingButton
          ref={buttonRef}
          size="large"
          fullWidth
          disabled={!isValidDeposit}
          style={
            buttonHeight !== undefined
              ? {
                  bottom: `-${buttonHeight / 2 + 20}px`,
                }
              : undefined
          }
        >
          Connect Wallet
        </OverflowingButton>
      ) : showApproveFlow ? (
        <OverflowingButton
          ref={buttonRef}
          size="large"
          fullWidth
          disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
          style={
            buttonHeight !== undefined
              ? {
                  bottom: `-${buttonHeight / 2 + 20}px`,
                }
              : undefined
          }
        >
          {approvalState === ApprovalState.APPROVED
            ? `You can now deposit ${currencies.DEPOSIT?.symbol}`
            : `Approve ${currencies.DEPOSIT?.symbol}`}
        </OverflowingButton>
      ) : (
        <OverflowingButton
          ref={buttonRef}
          size="large"
          fullWidth
          disabled={!isValidDeposit}
          style={
            buttonHeight !== undefined
              ? {
                  bottom: `-${buttonHeight / 2 + 20}px`,
                }
              : undefined
          }
        >
          {inputError?.DEPOSIT ? inputError.DEPOSIT : 'Deposit'}
        </OverflowingButton>
      )}
    </DepositContainer>
  );
}
