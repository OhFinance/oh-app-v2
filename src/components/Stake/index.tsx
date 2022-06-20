import Button from 'components/Button';
import CenteredRow from 'components/_containers/CenteredRow';
import FullWidthColumn from 'components/_containers/FullWidthColumn';
import OverFlowButtons from 'components/_containers/OverFlowButtons';
import SpacedRow from 'components/_containers/SpacedRow';
import CalculatorModal from 'components/_modals/CalculatorModal';
import Image from 'next/image';
import { useToggleModal } from 'state/application/hooks';
import { ApplicationModal } from 'state/application/reducer';
import styled from 'styled-components';

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
  '&:hover': {
    textDecoration: 'underline',
  },
});

interface IProps {
  onStake: () => void;
}

export const Stake: React.FC<IProps> = ({ onStake }) => {
  const toggleModal = useToggleModal(ApplicationModal.STAKE_CALCULATOR);
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
              <StatsValue>0.0</StatsValue>
              <StatsLabel>Stake OH! Boost</StatsLabel>
            </div>
          </CenteredRow>
          <CenteredRow>
            <div>
              <div>
                <StatsValue>0.0 </StatsValue>
                <span>OH! Boost</span>
              </div>
              <StatsLabel>Stake OH! Boost</StatsLabel>
            </div>
          </CenteredRow>
          <VSeperator />
          <CenteredRow>
            <div>
              <StatsValue>0.0</StatsValue>
              <StatsLabel>OH! Boost Mined</StatsLabel>
            </div>
          </CenteredRow>
        </SpacedRow>
        <CenteredRow>
          <div style={{ marginRight: 5 }}>
            <Image src="/img/oh_token_logo.png" width={40} height={40} alt="token" />
          </div>
          <CalculatorButton onClick={toggleModal}>
            OH! Boost APR (Booster Calculator)
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
