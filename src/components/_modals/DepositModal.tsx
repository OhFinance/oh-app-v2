import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import Button from 'components/Button';
import { Bank } from 'constants/banks';
import { SupportedChainId } from 'constants/chains';
import { useVirtualBalance } from 'hooks/calls/bank/useVirtualBalance';
import { useVirtualPrice } from 'hooks/calls/bank/useVirtualPrice';
import { useTotalSupply } from 'hooks/calls/token/useTotalSupply';
import { useBankContract } from 'hooks/contracts/useBankContract';
import { useActiveWeb3React } from 'hooks/web3';
import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Text } from 'rebass';
import { useModalOpen, useToggleModal } from 'state/application/hooks';
import { ApplicationModal } from 'state/application/reducer';
import { useDerivedStakeInfo } from 'state/stake/hooks';
import { TransactionType } from 'state/transactions/actions';
import { useTransactionAdder } from 'state/transactions/hooks';
import styled from 'styled-components';
import { calculateGasMargin } from 'utilities/calculateGasMargin';
import { currencyId } from 'utilities/currencyId';
import { ThemedText } from '~/theme';
import ModalIcon from './common/ModalIcon';
import OhModal from './common/OhModal';
import { ModalView } from './modalViews';

const Wrapper = styled.div({
  position: 'relative',
  overflow: 'show',
});

const StatLabel = styled(Text)(({ theme }) => ({
  color: theme.grey,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '14px',
  textAlign: 'right',
  paddingBottom: 4,
}));
const StatValue = styled(Text)(({ theme }) => ({
  color: theme.white,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  textAlign: 'right',
}));

const BarWrapper = styled.div<{ size: string | number }>(({ size }) => ({
  position: 'relative',
  height: size,
  width: 2,
  marginRight: 8,
  background: 'linear-gradient(180deg, #E7018C 0%, #009CE2 100%)',
}));

const Spacer = styled.div({
  width: '100%',
  boxSizing: 'border-box',
  height: 30,
});

const Dot = styled.div({
  width: 6,
  height: 6,
  borderRadius: 6,
  backgroundColor: '#2775CA',
  position: 'absolute',
});

const Start = styled(Dot)({
  top: 0,
  left: '50%',
  transform: 'translate(-50%, 0%)',
});

const End = styled(Dot)({
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 0%)',
});

const Stat = styled.div`
  padding-bottom: 8px;
`;

const Buttons = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 0px;
  transform: translate(0, 50%);
  z-index: 99;
`;

const MultipleButtons = styled(Buttons)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  & button {
    width: 100%;
  }
  & button:not(last-child) {
    margin-right: 16px;
  }
`;

const SingleButton = styled(Buttons)({
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
});

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#312D63',
  color: '#9896b1',
}));

export default function DepositModal({ bank }: { bank: Bank }) {
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT);
  const toggle = useToggleModal(ApplicationModal.DEPOSIT);

  const { currencies, parsedAmounts } = useDerivedStakeInfo(bank);

  const [title, setTitle] = useState(`Deposit ${currencies.DEPOSIT?.symbol}`);

  const totalValueLocked = useVirtualBalance(bank.ohToken);
  const sharePrice = useVirtualPrice(bank.ohToken);
  const totalSupply = useTotalSupply(bank.ohToken);

  const receivingAmount = useMemo(() => {
    if (parsedAmounts.DEPOSIT && totalSupply && totalValueLocked) {
      return totalSupply.multiply(parsedAmounts.DEPOSIT).divide(totalValueLocked);
    }
    return undefined;
  }, [parsedAmounts.DEPOSIT, totalSupply, totalValueLocked]);

  const shareOfBank = useMemo(() => {
    if (receivingAmount && totalSupply && sharePrice && parsedAmounts.DEPOSIT) {
      return receivingAmount.asFraction
        .divide(totalSupply.add(receivingAmount).asFraction)
        .multiply(100);
    }
    return undefined;
  }, [receivingAmount, totalSupply, parsedAmounts.DEPOSIT, sharePrice]);

  const { chainId, library, account } = useActiveWeb3React();
  const bankContract = useBankContract(bank.contractAddress);
  const addTransaction = useTransactionAdder();
  const [attemptingTx, setAttemptingTx] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>();
  // TODO: open deposit modal
  const onDeposit = useCallback(async () => {
    let parsedAmount = parsedAmounts.DEPOSIT;
    let currency = currencies.DEPOSIT;

    if (!chainId || !library || !account || !bankContract || !parsedAmount || !currency) return;

    let estimate = bankContract.estimateGas.deposit;

    let method = bankContract.deposit;
    setAttemptingTx(true);
    estimate(parsedAmount.quotient.toString())
      .then((estimatedGasLimit) =>
        method((parsedAmount as CurrencyAmount<Token>).quotient.toString(), {
          gasLimit:
            chainId === SupportedChainId.MOONRIVER
              ? 5000000
              : calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTx(false);
          setTxHash(response.hash);
          addTransaction(response, {
            type: TransactionType.DEPOSIT,
            currencyId: currencyId(currency as Currency),
            amountRaw: (parsedAmount as CurrencyAmount<Token>).quotient.toString(),
          });
        })
      )
      .catch((error) => {
        setAttemptingTx(false);

        if (error?.code !== 4001) {
          console.error(error);
        }
      });
  }, [chainId, library, account, parsedAmounts, currencies, addTransaction, bankContract]);

  if (!receivingAmount) {
    return null;
  }
  return (
    <OhModal title={title} isOpen={isOpen} onDismiss={toggle}>
      <Wrapper>
        {!attemptingTx && !txHash ? (
          <ModalIcon view={ModalView.DEPOSIT} amount={receivingAmount} />
        ) : attemptingTx ? (
          <ModalIcon view={ModalView.DEPOSITING} amount={receivingAmount} />
        ) : txHash ? (
          <ModalIcon view={ModalView.DEPOSIT_COMPLETE} hash={txHash} />
        ) : (
          <ModalIcon view={ModalView.DEPOSIT} amount={receivingAmount} />
        )}
        {!txHash && (
          <Flex flexDirection="row" justifyContent="space-between" marginTop="8px">
            <Flex flexDirection={'row'} alignItems="flex-end">
              <BarWrapper size={110}>
                <Start />
                <End />
              </BarWrapper>
              <Flex flexDirection={'column'}>
                <ThemedText.Main fontSize="14px">Deposit</ThemedText.Main>
                <ThemedText.Main fontSize="26px">
                  {parsedAmounts.DEPOSIT?.toFixed(3, { groupSeperator: ',' })}
                </ThemedText.Main>
                <Flex alignItems={'center'}>
                  <img
                    width={16}
                    height={16}
                    src={`/img/tokens/${bank.underlyingToken.address.toLowerCase()}.png`}
                    alt={bank.underlyingToken.symbol}
                    style={{ marginRight: 3, borderRadius: 16 }}
                  />
                  <ThemedText.Main fontSize="16px">{currencies.DEPOSIT?.symbol}</ThemedText.Main>
                </Flex>

                <Spacer />
                <ThemedText.Main fontSize="14px">Receive</ThemedText.Main>
                <ThemedText.Main fontSize="26px">
                  {receivingAmount?.toFixed(3, { groupSeperator: ',' })}
                </ThemedText.Main>
                <Flex alignItems={'center'}>
                  <img
                    width={16}
                    height={16}
                    src={bank.image}
                    alt={bank.ohToken.symbol}
                    style={{ marginRight: 3, borderRadius: 16 }}
                  />
                  <ThemedText.Main fontSize="16px">{bank.ohToken.symbol}</ThemedText.Main>
                </Flex>
              </Flex>
            </Flex>

            <div>
              <Stat>
                <StatLabel>Bank Token Rate</StatLabel>
                <StatValue>
                  1 {bank.ohToken.symbol} = {sharePrice?.toFixed(4)} {bank.underlyingToken.symbol}
                </StatValue>
              </Stat>
              <Stat>
                <StatLabel>Share of Bank</StatLabel>
                <StatValue>
                  {shareOfBank && shareOfBank.toFixed(2) === '0.00'
                    ? '<0.01'
                    : shareOfBank?.toFixed(2)}
                  %
                </StatValue>
              </Stat>
            </div>
          </Flex>
        )}
      </Wrapper>

      {!txHash && !attemptingTx ? (
        <MultipleButtons>
          <CancelButton size="large" onClick={toggle}>
            Cancel
          </CancelButton>
          <Button size="large" onClick={onDeposit}>
            Confirm
          </Button>
        </MultipleButtons>
      ) : txHash ? (
        <SingleButton>
          <Button size="large" onClick={toggle}>
            <span style={{ fontWeight: 600 }}>OH!</span> Thanks
          </Button>
        </SingleButton>
      ) : null}
    </OhModal>
  );
}
