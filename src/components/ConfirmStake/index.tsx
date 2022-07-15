import Button from 'components/Button';
import { CurrencyInput } from 'components/CurrencyInput';
import { FullWidthColumn } from 'components/_containers/FullWidthColumn';
import OverFlowButtons from 'components/_containers/OverFlowButtons';
import SpacedRow from 'components/_containers/SpacedRow';
import { OH } from 'constants/tokens';
import { useConfirmOHStake, useOHBalance, useOHStaked } from 'hooks/stake';
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
  width: '100%',
});

interface IProps {
  onCancel: () => void;
}

export const ConfirmStake: React.FC<IProps> = ({ onCancel }) => {
  const { chainId } = useActiveWeb3React();
  const ohToken = OH[chainId];
  const ohAmount = useOHBalance();
  const stacked = useOHStaked();
  const { price } = usePriceStore();

  const [value, setValue] = useState('0.0');

  const { confirmStake, loading } = useConfirmOHStake();
  return (
    <FullWidthColumn gap={20} padding="15px 0 45px 0 ">
      <Flex alignItems={'center'} flexDirection="column">
        <Heading>
          Confirm Stake <Image src="/img/oh-token.png" width={60} height={66} alt="token" /> OH!
          Boost
        </Heading>
      </Flex>
      <SpacedRow>
        <Stats>Staked: {stacked.toFixed(2)} OH!</Stats>
        <Stats>Stakeable: {ohAmount?.toFixed(2) || '0.00'} OH!</Stats>
      </SpacedRow>
      <CurrencyInput
        currency={ohToken}
        value={value}
        onUserInput={(value) => setValue(value)}
        onMax={() => setValue(ohAmount?.toString() || '0.00')}
        showMaxButton
        hideAvailableBalance
      />
      <FullWidthColumn gap={15}>
        <SpacedRow>
          Token Price<span>$ {price.toFixed(6)}</span>
        </SpacedRow>
        <SpacedRow>
          Token Stake<span>{stacked.toFixed(2)} OH! Boost</span>
        </SpacedRow>
      </FullWidthColumn>
      <OverFlowButtons>
        <CancelButton size="large" onClick={onCancel}>
          Cancel
        </CancelButton>
        <ConfirmButton
          size="large"
          disabled={!value || +value === 0 || loading}
          onClick={() => confirmStake(value)}
        >
          Confirm
        </ConfirmButton>
      </OverFlowButtons>
    </FullWidthColumn>
  );
};

export default ConfirmStake;
