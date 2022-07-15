import Button from 'components/Button';
import InfoBox from 'components/InfoBox';
import CenteredRow from 'components/_containers/CenteredRow';
import FullWidthColumn from 'components/_containers/FullWidthColumn';
import OverFlowButtons from 'components/_containers/OverFlowButtons';
import SpacedRow from 'components/_containers/SpacedRow';
import CalculatorModal from 'components/_modals/CalculatorModal';
import { useOHBoostStats } from 'hooks/stake';
import Image from 'next/image';
import { AiOutlineCalculator } from 'react-icons/ai';
import { useToggleModal } from 'state/application/hooks';
import { ApplicationModal } from 'state/application/reducer';
import styled from 'styled-components';
import { formatShortAmount } from 'utilities/formatCurrencyAmount';

const Heading = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  text-align: center;
`;

const StatsLabel = styled.p(({ theme }) => ({
  fontSize: '13px',
  lineHeight: '15px',
  color: theme.blue,
  fontWeight: 400,
  margin: 0,
}));

const StatsValue = styled.span({
  fontSize: '24px',
  lineHeight: '28px',
  color: 'white',
  fontWeight: 500,
  margin: 0,
});

const VSeperator = styled.div(({ theme }) => ({
  borderLeft: '1px solid',
  borderLeftColor: theme.blue,
  height: '55px',
}));

const StakeButton = styled(Button)({
  width: '100%',
});

const CalculatorButton = styled(StatsLabel)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  columnGap: '0.2rem',
  '&:hover': {
    textDecoration: 'underline',
  },
});

interface IProps {
  onStake: () => void;
}

export const Stake: React.FC<IProps> = ({ onStake }) => {
  const toggleModal = useToggleModal(ApplicationModal.STAKE_CALCULATOR);

  const { ohStaked, ohSupply, veOHSupply } = useOHBoostStats();
  return (
    <>
      <CalculatorModal />
      <FullWidthColumn gap={10}>
        <FullWidthColumn>
          <Heading>Stake OH! Boost to Yield</Heading>
          <Image src="/img/oh-token.png" width={255} height={266} alt="token" />
        </FullWidthColumn>
        <SpacedRow>
          <CenteredRow>
            <div style={{ marginRight: 10 }}>
              <Image src="/img/oh-token.svg" width={50} height={50} alt="token" />
            </div>
            <div>
              <StatsValue>{formatShortAmount(ohSupply)}</StatsValue>
              <StatsLabel>OH! Supply</StatsLabel>
            </div>
          </CenteredRow>
          <CenteredRow>
            <div>
              <div>
                <StatsValue>{ohStaked}</StatsValue>
                <span> OH!</span>
              </div>
              <StatsLabel>OH! Supply Staked</StatsLabel>
            </div>
          </CenteredRow>
          <VSeperator />
          <CenteredRow>
            <div>
              <StatsValue>{formatShortAmount(veOHSupply)}</StatsValue>
              <StatsLabel>OH! Boost Mined</StatsLabel>
            </div>
          </CenteredRow>
        </SpacedRow>
        <CenteredRow>
          <div style={{ marginRight: 5 }}>
            <Image src="/img/oh_token_logo.png" width={40} height={40} alt="token" />
          </div>
          <CalculatorButton onClick={toggleModal}>
            OH! Boost APR
            <InfoBox text="Your veOH balance contributes to your Boosted APR." />
            (Booster Calculator <AiOutlineCalculator />)
          </CalculatorButton>
        </CenteredRow>
        <OverFlowButtons>
          <StakeButton size="large" onClick={onStake}>
            Stake
          </StakeButton>
        </OverFlowButtons>
      </FullWidthColumn>
    </>
  );
};

export default Stake;
