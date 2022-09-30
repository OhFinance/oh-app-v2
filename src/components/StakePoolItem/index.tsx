import StakePoolActionItem from 'components/StakePoolActionItem';
import { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { Tooltip, TooltipProps } from 'react-tippy';
import styled from 'styled-components';
import { useActiveWeb3React } from 'hooks/web3';
import {
  getUserInfo,
  getPendingRewards,
  getUserBal,
  deposit,
  withdraw,
  isTokenApproved,
  approveToken,
  AprInfo,
  getAprInfo,
} from 'apis/MasterOh';
import { ethers } from 'ethers';

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
  pid: number;
  tokenAddress: string;
  decimals: number;
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
  onStake: Function;
  unUnstake: Function;
  onClaim: Function;
}

const StakePoolItem = (props: StakePoolItemProps) => {
  const { chainId, account, library } = useActiveWeb3React();

  const [expandContent, setExpandContent] = useState(false);
  const [myDeposit, setMyDeposit] = useState('0.00');
  const [pendingOh, setPendingOh] = useState('0.00');
  const [stakeable, setStakeable] = useState('0.00');
  const [isApproved, setIsApproved] = useState(false);
  const [aprInfo, setAprInfo] = useState<AprInfo>({});

  const fetchInfo = async () => {
    if (!chainId || !library) {
      return;
    }

    const _aprInfo = await getAprInfo(account, props.pid, chainId, library);
    setAprInfo(_aprInfo);

    if (!account) {
      return;
    }

    const _isApproved = await isTokenApproved(account, props.tokenAddress, chainId, library);
    setIsApproved(_isApproved);

    const _userInfo = await getUserInfo(account, props.pid, chainId, library);
    const stakedAmount = ethers.utils.formatUnits(_userInfo.amount, props.decimals);
    setMyDeposit(parseFloat(stakedAmount).toFixed(2));

    const rewardInfo = await getPendingRewards(account, props.pid, chainId, library);
    const ohAmount = ethers.utils.formatEther(rewardInfo.pendingOh, props.decimals);
    setPendingOh(parseFloat(ohAmount).toFixed(2));

    const userBal = await getUserBal(account, props.tokenAddress, chainId, library);
    const _stakeable = ethers.utils.formatUnits(userBal, props.decimals);
    setStakeable(parseFloat(_stakeable).toFixed(2));
  };

  const submitWithdrawAll = async () => {
    try {
      const _userInfo = await getUserInfo(account, props.pid, chainId, library);
      await (await withdraw(props.pid, _userInfo.amount, chainId, library)).wait();
      props.onUnstake();
    } catch (e) {
      console.error(e);
    }
  };

  const submitDepositAll = async () => {
    if (isApproved) {
      try {
        const userBal = await getUserBal(account, props.tokenAddress, chainId, library);
        await (await deposit(props.pid, userBal, chainId, library)).wait();
        props.onStake();
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await approveToken(account, props.tokenAddress, chainId, library);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const submitClaim = async () => {
    try {
      await (await deposit(props.pid, 0, chainId, library)).wait();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [chainId, account, library]);

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
            <ValueText>{props.poolDeposits}</ValueText>
            <GreyText>{props.tokenSymbol}</GreyText>
          </ContentContainer>
          <ContentContainer>
            <GreyText>My Deposits</GreyText>
            <ValueText>{myDeposit}</ValueText>
            <GreyText>{props.tokenSymbol}</GreyText>
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
                <GreyText>Base APR: </GreyText> {aprInfo.baseApr || '--'}% <BiHelpCircle />
              </GreyTextHorizontalContainer>
            </TooltipComponent>
            <TooltipComponent
              // note: check over these messages and make sure I'm passing in the correct symbols. Only have one reward token on hummas, but there's potentially 2 what do?
              title={`Median APR for users who have staked ${props.tokenSymbol} and have earned ${props.rewardSymbol} Does not include Base APR`}
              position="top"
              trigger="mouseenter"
            >
              <GreyTextHorizontalContainer>
                <GreyText>Median Boosted APR: </GreyText> {aprInfo.medianBoostedApr || '--'}%{' '}
                <BiHelpCircle />
              </GreyTextHorizontalContainer>
            </TooltipComponent>
            <TooltipComponent
              // note: check over these messages and make sure I'm passing in the correct symbols. Only have one reward token on hummas, but there's potentially 2 what do?
              title={`Boosted APR you receive for your staked ${props.tokenSymbol} based on your ${props.rewardSymbol}`}
              position="top"
              trigger="mouseenter"
            >
              <GreyTextHorizontalContainer>
                <GreyText>My Boosted APR: </GreyText> {aprInfo.myBoostedApr || '--'}%{' '}
                <BiHelpCircle />
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
              leftAmount={pendingOh}
              leftIcon={props.rewardIcon}
              leftSymbol={props.rewardSymbol}
              //rightIcon={props.rewardIcon2}
              rightAmount={props.reward2Amount}
              rightSymbol={props.reward2Symbol}
              actionText={'Claim'}
              action={submitClaim}
            />
            <StakePoolActionItem
              leftTitle="Staked"
              leftIcon={props.stakedTokenIcon}
              leftAmount={myDeposit}
              leftSymbol={props.tokenSymbol}
              rightTitle="Stakeable"
              rightAmount={stakeable}
              rightIcon={props.stakeableTokenIcon}
              rightSymbol={props.tokenSymbol}
              divider={true}
              actionText={isApproved ? 'Stake All' : 'Approve'}
              action={submitDepositAll}
              footer={`Earned ${props.rewardSymbol} will automatically be claimed on staking`}
            />
            <StakePoolActionItem
              leftTitle="Staked"
              leftIcon={props.stakedTokenIcon}
              leftAmount={myDeposit}
              leftSymbol={props.tokenSymbol}
              rightTitle="Stakeable"
              rightAmount={stakeable}
              rightIcon={props.stakeableTokenIcon}
              rightSymbol={props.tokenSymbol}
              divider={true}
              actionText={'Unstake All'}
              action={submitWithdrawAll}
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
