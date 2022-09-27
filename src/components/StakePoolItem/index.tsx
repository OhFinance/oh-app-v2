import StakePoolActionItem from 'components/StakePoolActionItem';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { Tooltip, TooltipProps } from 'react-tippy';
import styled from 'styled-components';

const Container = styled.div(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.bg4,
  margin: '20px',
  borderRadius: '20px',
}));

const UpperContainer = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
}));

const ContainerLeft = styled.div({
  padding: '10px',
});

const TokenInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});
const TokenIcon = styled.img({
  width: '50px',
  height: '50px',
});

const TokenSymbol = styled.p({
  color: 'white',
  fontSize: '30px',
  margin: '0px',
});

const GreyTextHorizontalContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
});
const CoverageRatioAmount = styled.p({
  color: 'white',
  margin: '0px',
});
const GreyText = styled.p({
  color: 'grey',
  margin: '0px 5px 0 0',
});

const ContentContainer = styled.div({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const ValueText = styled.p({
  fontSize: '20px',
  lineHeight: '30px',
  margin: '0',
});

const ActionButtonsContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ActionButtons = styled.button(({ theme }) => ({
  backgroundColor: theme.bgPink,
  fontSize: '20px',
  color: 'white',
  height: '60px',
  width: '150px',
  borderRadius: '20px',
  marginLeft: '5px',
  border: '1px solid #b1026b',
  boxShadow: '5px 5px 50px ' + theme.bgPink,
}));

const LowerContainer = styled.div(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.bg2,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '20px',
}));

const RewardContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignText: 'center',
  marginRight: '5px',
});

const Reward = styled.p(({ theme }) => ({
  color: theme.blue,
  fontWeight: '900',
  margin: '0 5px 0 0',
  fontSize: '30px',
  fontFamily: 'Arial',
}));

const ReactIconContainer = styled.div({
  marginLeft: '5px',
  display: 'flex',
  justifyContent: 'center',
});

const TooltipComponent = Tooltip as unknown as React.FC<TooltipProps>;
`
margin-left: 5px;
`;

interface ExpandLowerButtonProps {
  expanded: boolean;
}

const ExpandLowerButton = styled.button<ExpandLowerButtonProps>`
  background-color: ${(props) => (props.expanded ? 'grey' : props.theme.blue)};
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border: none;
  margin: 0;
`;
const ExpandLowerText = styled.p({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignText: 'center',
  color: '#004F7D',
  fontSize: '20px',
  margin: '0',
});
const HorizontalContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '20px',
  margin: '10px',
});

interface StakePoolItemProps {
  tokenSymbol: string;
  tokenIcon: string;
  rewardIcon: string;
  rewardSymbol: string;
  rewardAmount: string;
  rewardIcon2?: string;
  reward2Symbol?: string;
  reward2Amount?: string;
  coverageRatio: string;
  poolDeposits: string;
  myDeposits: string;
  baseApr: string;
  medianBoostedApr: string;
  myBoostedApr: string;

  claimFunction: Function;
  stakedAmount: string;
  stakedTokenSymbol: string;
  stakedTokenIcon: string;
  stakeAllFunction: Function;

  stakeableAmount: string;
  stakeableTokenSymbol: string;
  stakeableTokenIcon: string;
  unstakeAllFunction: Function;
}

const StakePoolItem = (props: StakePoolItemProps) => {
  const [expandContent, setExpandContent] = useState(false);
  return (
    <Container>
      <UpperContainer>
        <ContainerLeft>
          <TokenInfo>
            <TokenIcon src={props.tokenIcon} alt="tokenIcon" />
            <TokenSymbol>{props.tokenSymbol}</TokenSymbol>
          </TokenInfo>
          <GreyTextHorizontalContainer>
            <GreyText>Coverage Ratio: </GreyText>{' '}
            <CoverageRatioAmount>{props.coverageRatio}</CoverageRatioAmount>
          </GreyTextHorizontalContainer>
        </ContainerLeft>
        <>
          <ContentContainer>
            <GreyText>Pool Deposits</GreyText>
            <ValueText>{props.myDeposits}</ValueText>
            <GreyText>6.33M {props.tokenSymbol}</GreyText>
          </ContentContainer>
          <ContentContainer>
            <GreyText>My Deposits</GreyText>
            <ValueText>{props.myDeposits}</ValueText>
            <GreyText>My Deposits</GreyText>
          </ContentContainer>
        </>
        <ActionButtonsContainer>
          <ActionButtons>Deposit</ActionButtons>
          <ActionButtons>Withdraw</ActionButtons>
        </ActionButtonsContainer>
      </UpperContainer>
      <LowerContainer>
        <HorizontalContainer>
          <RewardContainer>
            <Reward>REWARD</Reward>
            <TokenIcon src={props.rewardIcon} />
            {props.rewardIcon2 ? <TokenIcon src={props.rewardIcon2} /> : <></>}
          </RewardContainer>

          <HorizontalContainer>
            <TooltipComponent
              // note: check over these messages and make sure I'm passing in the correct symbols
              title={`Base APR for users who have deposited and staked ${props.tokenSymbol}`}
              position="top"
              trigger="mouseenter"
            >
              <GreyTextHorizontalContainer>
                <GreyText>Base APR: </GreyText> {props.baseApr}% <BiHelpCircle />
              </GreyTextHorizontalContainer>
            </TooltipComponent>
            <TooltipComponent
              // note: check over these messages and make sure I'm passing in the correct symbols. Only have one reward token on hummas, but there's potentially 2 what do?
              title={`Median APR for users who have staked ${props.tokenSymbol} and have earned ${props.rewardSymbol} Does not include Base APR`}
              position="top"
              trigger="mouseenter"
            >
              <GreyTextHorizontalContainer>
                <GreyText>Median Boosted APR: </GreyText> {props.medianBoostedApr}% <BiHelpCircle />
              </GreyTextHorizontalContainer>
            </TooltipComponent>
            <TooltipComponent
              // note: check over these messages and make sure I'm passing in the correct symbols. Only have one reward token on hummas, but there's potentially 2 what do?
              title={`Boosted APR you receive for your staked ${props.tokenSymbol} based on your ${props.rewardSymbol}`}
              position="top"
              trigger="mouseenter"
            >
              <GreyTextHorizontalContainer>
                <GreyText>My Boosted APR: </GreyText> {props.myBoostedApr}% <BiHelpCircle />
              </GreyTextHorizontalContainer>
            </TooltipComponent>
          </HorizontalContainer>
          <ExpandLowerButton
            onClick={() => setExpandContent(!expandContent)}
            expanded={expandContent}
          >
            <ExpandLowerText>
              {expandContent ? (
                <>
                  Close
                  <ReactIconContainer>
                    <AiOutlineCloseCircle />
                  </ReactIconContainer>
                </>
              ) : (
                <>
                  Stake
                  <ReactIconContainer>
                    <BsArrowDownCircleFill />
                  </ReactIconContainer>
                </>
              )}
            </ExpandLowerText>
          </ExpandLowerButton>
        </HorizontalContainer>
        {expandContent ? (
          <HorizontalContainer>
            <StakePoolActionItem
              leftTitle="Earned"
              leftAmount={props.rewardAmount}
              leftIcon={props.rewardIcon}
              leftSymbol={props.rewardSymbol}
              rightIcon={props.rewardIcon2}
              rightAmount={props.reward2Amount}
              rightSymbol={props.reward2Symbol}
              actionText={'Claim'}
              action={props.claimFunction}
            />
            <StakePoolActionItem
              leftTitle="Staked"
              leftIcon={props.stakedTokenIcon}
              leftAmount={props.stakedAmount}
              leftSymbol={props.stakedTokenSymbol}
              rightTitle="Stakeable"
              rightAmount={props.stakeableAmount}
              rightIcon={props.stakeableTokenIcon}
              rightSymbol={props.stakeableTokenSymbol}
              divider={true}
              actionText={'Stake All'}
              action={props.stakeAllFunction}
              footer={`Earned ${props.rewardSymbol} will automatically be claimed on staking`}
            />
            <StakePoolActionItem
              leftTitle="Staked"
              leftIcon={props.stakedTokenIcon}
              leftAmount={props.stakedAmount}
              leftSymbol={props.stakedTokenSymbol}
              rightTitle="Stakeable"
              rightAmount={props.stakeableAmount}
              rightIcon={props.stakeableTokenIcon}
              rightSymbol={props.stakeableTokenSymbol}
              divider={true}
              actionText={'Unstake All'}
              action={props.unstakeAllFunction}
              footer={`Earned ${props.rewardSymbol} will automatically be claimed on staking`}
            />
          </HorizontalContainer>
        ) : (
          <></>
        )}
      </LowerContainer>
    </Container>
  );
};
export default StakePoolItem;
