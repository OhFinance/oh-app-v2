import Button from 'components/Button';
import { CurrencyInput } from 'components/CurrencyInput';
import Spinner from 'components/Spinner';
import { FullWidthColumn } from 'components/_containers/FullWidthColumn';
import OverFlowButtons from 'components/_containers/OverFlowButtons';
import SpacedRow from 'components/_containers/SpacedRow';
import { OH } from 'constants/tokens';
import { useConfirmOHStake, useOHBalance, useOHStaked, useWithdrawOHStake } from 'hooks/stake';
import { useActiveWeb3React } from 'hooks/web3';
import Image from 'next/image';
import { useState } from 'react';
import { Flex } from 'rebass';
import { usePriceStore } from 'stores/usePriceStore';
import styled from 'styled-components';

const Stats = styled.p(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '16px',
  color: theme.blue,
  fontWeight: 400,
  margin: 0,
}));

const Heading = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const CancelButton = styled(Button)({
  backgroundColor: '#312D63',
  color: '#9896b1',
  width: '100%',
});

const ConfirmButton = styled(Button)({
  position: 'relative',
  width: '100%',
});

interface IProps {
  type: 'withdraw' | 'deposit';
  onCancel: () => void;
}

export const StakeAction: React.FC<IProps> = ({ type, onCancel }) => {
  const { chainId } = useActiveWeb3React();
  const ohToken = OH[chainId];
  const ohAmount = useOHBalance();
  const { staked, getStaked } = useOHStaked();
  const { price } = usePriceStore();

  const [value, setValue] = useState('0.0');

  const {
    confirmStake,
    loading: confirmLoading,
    approveStake,
    approved,
    updateAllowance,
  } = useConfirmOHStake();
  const { withdrawStake, loading: withdrawLoading } = useWithdrawOHStake();

  const disabled =
    (+value || Infinity) > (type === 'withdraw' ? staked : ohAmount) || (+value || 0) <= 0;

  const loading = confirmLoading || withdrawLoading;
  const onConfirm = () => {
    type === 'withdraw'
      ? withdrawStake(value).then(getStaked)
      : approved
      ? confirmStake(value).then(getStaked)
      : approveStake(value);
  };
  const onMax = () => {
    const amount = type === 'withdraw' ? staked : ohAmount;
    loading || approved || setValue(amount?.toString() || '0.00');
  };

  return (
    <FullWidthColumn gap={20} padding="15px 0 45px 0 ">
      <Flex alignItems={'center'} flexDirection="column">
        <Heading>
          Confirm {type === 'withdraw' ? 'Withdraw' : 'Stake'}{' '}
          <Image src="/img/oh-token.png" width={60} height={66} alt="token" /> OH! Boost
        </Heading>
      </Flex>
      <SpacedRow>
        <Stats>Staked: {staked.toFixed(2)} OH!</Stats>
        <Stats>Stakeable: {ohAmount?.toFixed(2) || '0.00'} OH!</Stats>
      </SpacedRow>
      <CurrencyInput
        currency={ohToken}
        value={value}
        onUserInput={(value) => setValue(value)}
        onMax={onMax}
        showMaxButton
        hideAvailableBalance
        updateAllowance={updateAllowance}
      />
      <FullWidthColumn gap={15}>
        <SpacedRow>
          Token Price<span>$ {price.toFixed(6)}</span>
        </SpacedRow>
        <SpacedRow>
          Token Stake<span>{staked.toFixed(2)} OH! Boost</span>
        </SpacedRow>
      </FullWidthColumn>
      <OverFlowButtons>
        <CancelButton size="large" onClick={onCancel} disabled={loading}>
          Cancel
        </CancelButton>
        <ConfirmButton size="large" disabled={disabled || loading} onClick={onConfirm}>
          {loading ? <Spinner /> : null}
          <span style={{ opacity: loading ? 0 : 1 }}>
            {type === 'withdraw' ? 'Withdraw' : approved ? 'Confirm' : 'Approve'}
          </span>
        </ConfirmButton>
      </OverFlowButtons>
    </FullWidthColumn>
  );
};

export default StakeAction;
