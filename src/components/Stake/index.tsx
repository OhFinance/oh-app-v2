import Button from 'components/Button';
import { ColumnCenter } from 'components/Column';
import InfoBox from 'components/InfoBox';
import Spinner from 'components/Spinner';
import CenteredRow from 'components/_containers/CenteredRow';
import FullWidthColumn from 'components/_containers/FullWidthColumn';
import OverFlowButtons from 'components/_containers/OverFlowButtons';
import SpacedRow from 'components/_containers/SpacedRow';
import { formatEther } from 'ethers/lib/utils';
import {
  useClaimVeOH,
  useOHBoostStats,
  useOHStaked,
  useVeOHBalance,
  useVeOHClaimable,
} from 'hooks/stake';
import Image from 'next/image';
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

const ClaimContainer = styled(SpacedRow)(({ theme }) => ({
  padding: '30px',
  margin: '0 0 20px',
  backgroundColor: theme.bg3,
  borderRadius: 10,
}));

const InfoContainer = styled(SpacedRow)({
  gap: 4,
  justifyContent: 'center',
  paddingBottom: '10px',
});

const StakedContainer = styled(SpacedRow)({
  padding: '30px',
  margin: '30px 0',
  justifyContent: 'space-between',
});

const BalanceHeadContainer = styled(SpacedRow)({
  padding: '0 20px',
});

const ClaimButton = styled(Button)({ padding: '15px 70px', position: 'relative' });

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
  onUnStake: () => void;
}

export const Stake: React.FC<IProps> = ({ onStake, onUnStake }) => {
  const toggleModal = useToggleModal(ApplicationModal.STAKE_CALCULATOR);

  const { ohStaked, ohSupply, veOHSupply, veOHRate } = useOHBoostStats();
  const { veOHBalance, getBalance } = useVeOHBalance();
  const { veOHClaimable, getClaimable } = useVeOHClaimable();
  const { claimVeOH, loading } = useClaimVeOH();
  const { staked, getStaked } = useOHStaked();

  const onClaim = () => {
    claimVeOH().then(() => {
      getBalance();
      getClaimable();
    });
  };

  return (
    <>
      <FullWidthColumn gap={10}>
        <FullWidthColumn>
          <Heading>Stake OH to Boost Yield</Heading>
          <Image src="/img/oh-token.png" width={255} height={266} alt="token" />
        </FullWidthColumn>
        <SpacedRow>
          <CenteredRow>
            <FullWidthColumn>
              <div>
                <StatsValue>{formatShortAmount(veOHSupply)}</StatsValue>
                <span> veOH</span>
              </div>
              <StatsLabel>veOH Total Supply</StatsLabel>
            </FullWidthColumn>
          </CenteredRow>

          <VSeperator />
          <CenteredRow>
            <FullWidthColumn>
              <div>
                <StatsValue>{formatShortAmount(ohStaked)}</StatsValue>
                <span> OH</span>
              </div>
              <StatsLabel>OH Supply Staked</StatsLabel>
            </FullWidthColumn>
          </CenteredRow>
          <VSeperator />
          <CenteredRow>
            {/* <div style={{ marginRight: 10 }}>
              <Image src="/img/oh-token.svg" width={50} height={50} alt="token" />
            </div> */}
            <FullWidthColumn>
              <div>
                <StatsValue>{formatShortAmount(ohSupply)}</StatsValue>
                <span> OH</span>
              </div>
              <StatsLabel>OH Total Supply</StatsLabel>
            </FullWidthColumn>
          </CenteredRow>
        </SpacedRow>
        {/* <CenteredRow>
          <div style={{ marginRight: 5 }}>
            <Image src="/img/oh_token_logo.png" width={40} height={40} alt="token" />
          </div>
          <CalculatorButton onClick={toggleModal}>
            OH! Boost APR
            <InfoBox text="Your veOH balance contributes to your Boosted APR." />
            (Booster Calculator <AiOutlineCalculator />)
          </CalculatorButton>
        </CenteredRow> */}
        <ColumnCenter>
          <BalanceHeadContainer>
            <Heading>My Balance</Heading>
            <StatsValue>{veOHBalance.toFixed(2)} veOH</StatsValue>
          </BalanceHeadContainer>
          <ClaimContainer>
            <ColumnCenter>
              <InfoContainer>
                Claimable veOH
                <InfoBox text="Amount of veOH that can be claimed now." />
              </InfoContainer>
              <StatsValue>{veOHClaimable.toFixed(2)}</StatsValue>
            </ColumnCenter>
            <ClaimButton size="medium" disabled={loading || veOHClaimable <= 0} onClick={onClaim}>
              <div style={{ opacity: loading ? 0 : 1 }}>Claim</div>
              {loading && <Spinner />}
            </ClaimButton>
          </ClaimContainer>
          <StakedContainer>
            <CenteredRow>
              <div style={{ marginRight: 10 }}>
                <Image src="/img/oh-token.svg" width={50} height={50} alt="token" />
              </div>
              <div>
                <StatsValue>{formatShortAmount(staked)}</StatsValue>
                <StatsLabel>Staked OH</StatsLabel>
              </div>
            </CenteredRow>

            <CenteredRow>
              <div>
                {/* <StatsValue>{veOHRate? * (staked || 0)} veOH / hour</StatsValue> */}
                <StatsValue>
                  {formatShortAmount(+formatEther(veOHRate) * (staked || 0) * 3600)} veOH / hour
                </StatsValue>
                <StatsLabel>
                  <CenteredRow>
                    veOH Mine Rate
                    <InfoBox text="Amount of veOH taht your OH stake produces per hour." />
                  </CenteredRow>
                </StatsLabel>
              </div>
            </CenteredRow>
          </StakedContainer>
        </ColumnCenter>
        <OverFlowButtons>
          <StakeButton size="large" disabled={loading} onClick={onUnStake}>
            Unstake
          </StakeButton>
          <StakeButton size="large" disabled={loading} onClick={onStake}>
            Stake
          </StakeButton>
        </OverFlowButtons>
      </FullWidthColumn>
    </>
  );
};

export default Stake;
