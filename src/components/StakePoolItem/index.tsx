import {
  approveToken,
  AprInfo,
  checkTokenAllowanceAndBalance,
  compareAllowance,
  deposit,
  getAprInfo,
  getPendingRewards,
  getSecondaryRewardInfo,
  getUserBal,
  getUserInfo,
  withdraw,
} from 'apis/MasterOh';
import Spinner from 'components/Spinner';
import StakePoolActionItem from 'components/StakePoolActionItem';
import OhModal from 'components/_modals/common/OhModal';
import WarningModal from 'components/_modals/common/WarningModal';
import { CHAIN_INFO } from 'constants/chains';
import { getTokenIcon } from 'constants/tokens';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useActiveWeb3React, UseMedianBoostedAPR } from 'hooks/web3';
import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineDownCircle } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { HiCheckCircle } from 'react-icons/hi';

import { Tooltip, TooltipProps } from 'react-tippy';
import styled from 'styled-components';

interface ContainerProps {
  expandContent?: boolean;
}
const Container = styled.div<ContainerProps>((props) => ({
  width: '100%',
  backgroundColor: '#000B35',
  boxShadow: '0px 0 20px #00288D inset',
  margin: '20px',
  borderRadius: '20px',
  marginBottom: props.expandContent ? '80px' : '0',
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
  margin: '0 0 0 5px',
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

interface LowerContainerProps {
  expandContent: boolean;
}
const LowerContainer = styled.div<LowerContainerProps>((props) => ({
  width: '100%',
  backgroundColor: '#00124B',
  boxShadow: '0px 0 40px #00288D inset',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '20px',
  position: 'relative',
}));

const LowerShadowContainer = styled.div<LowerContainerProps>((props) => ({
  height: '30%',
  width: '100%',
  borderRadius: '20px',
  position: 'absolute',
  boxShadow: props.expandContent ? `0px 0px 100px ${props.theme.bgPink}` : `none`,
  bottom: '5px',
  left: '0',
  zIndex: '-5',
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
  background-color: ${(props) => (props.expanded ? props.theme.buttonDisabled : props.theme.blue)};
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border: none;
  margin: 0;
`;
interface ExpandLowerTextProps {
  expandContent: boolean;
}
const ExpandLowerText = styled.p<ExpandLowerTextProps>((props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignText: 'center',
  color: props.expandContent ? '#9896B1' : '#004E7D',
  fontSize: '20px',
  margin: '0',
}));

const HorizontalContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '20px',
  margin: '10px',
});

const ModalInput = styled.input(({ theme }) => ({
  textAlign: 'right',
  backgroundColor: theme.inputBG,
  height: '40px',
  margin: '15px',
  padding: '10px',
  borderRadius: '10px',
  border: 'none',
  color: '#A4AADF',
  width: '100%',
}));

const ModalButtons = styled.button((props) => ({
  backgroundColor: props.theme.bgPink,
  height: '30px',
  width: '80%',
  margin: '5px',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#ad056b',
    cursor: 'pointer',
  },
  '&:active': {
    backgroundColor: '#c41a81',
    cursor: 'pointer',
  },
  '&:disabled': {
    backgroundColor: props.theme.bgDisabledPink,
  },
}));
const ModalContent = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
const SpinnerContainer = styled.div({
  margin: '25px 0 15px 0',
  display: 'flex',
  justifyContent: 'center',
});
const TransactionCompleteIcon = styled.div({
  fontSize: '50px',
  height: '50px',
  margin: '0',
  color: 'green',
});
const TransactionCompleteContainer = styled.div({
  margin: '0 0 25px 0',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  textAlign: 'center',
});

interface StakePoolItemProps {
  pid: number;
  tokenAddress: string;
  decimals: number;
  tokenSymbol: string;
  tokenIcon: string;
  rewardIcon: string;
  rewardSymbol: string;
  poolDeposits: string | number;
  onStake: Function;
  onUnstake: Function;
  onClaim: Function;
}

const StakePoolItem = (props: StakePoolItemProps) => {
  const { chainId, account, library } = useActiveWeb3React();

  const [expandContent, setExpandContent] = useState(false);
  const [myDeposit, setMyDeposit] = useState('0.00');
  const [pendingOh, setPendingOh] = useState('0.00');
  const [stakeable, setStakeable] = useState('0.00');
  const [isApproved, setIsApproved] = useState(false);
  const [isStakeAllApproved, setIsStakeAllApproved] = useState(false);
  const [aprInfo, setAprInfo] = useState<AprInfo>({});
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [amount, setAmount] = useState('0.0');
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [warningModalText, setWarningModalText] = useState('Warning');
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [reward2Amount, setReward2Amount] = useState(0);
  const [reward2Symbol, setReward2Symbol] = useState('');
  const [reward2Address, setReward2Address] = useState('');

  const [medianBoostedApr, setMedianBoostedApr] = useState('0.0');

  const openWarningModal = (message: string) => {
    setWarningModalText(message);
    setWarningModalOpen(true);
    setTransactionModalOpen(false);
  };
  const fetchInfo = async () => {
    if (!chainId || !library) {
      return;
    }

    const tempMedianBoostedApr: BigNumber = await UseMedianBoostedAPR(props.pid, chainId, library);
    setMedianBoostedApr(formatEther(tempMedianBoostedApr));

    const _aprInfo = await getAprInfo(account, props.pid, chainId, library);
    setAprInfo(_aprInfo);
    const _secondaryRewardInfo = await getSecondaryRewardInfo(account, props.pid, chainId, library);

    if (_secondaryRewardInfo.rewardTokenAmount) {
      setReward2Amount(_secondaryRewardInfo.rewardTokenAmount);
    }
    if (_secondaryRewardInfo.rewardTokenAddress) {
      setReward2Address(_secondaryRewardInfo.rewardTokenAddress);
      setReward2Symbol(_secondaryRewardInfo.rewardTokenSymbol);
    }

    if (!account) {
      return;
    }

    setIsApproved(
      await compareAllowance(amount, props.decimals, account, props.tokenAddress, chainId, library)
    );

    setIsStakeAllApproved(
      await checkTokenAllowanceAndBalance(account, props.tokenAddress, chainId, library)
    );

    const _userInfo = await getUserInfo(account, props.pid, chainId, library);
    const stakedAmount = ethers.utils.formatUnits(_userInfo.amount, props.decimals);
    setMyDeposit(stakedAmount);

    const rewardInfo = await getPendingRewards(account, props.pid, chainId, library);
    const ohAmount = ethers.utils.formatEther(rewardInfo.pendingOh, props.decimals);
    setPendingOh(ohAmount);

    const userBal = await getUserBal(account, props.tokenAddress, chainId, library);
    const _stakeable = ethers.utils.formatUnits(userBal, props.decimals);
    setStakeable(_stakeable);
  };

  const startTransaction = () => {
    setTransactionHash('');
    setTransactionInProgress(true);
    setTransactionModalOpen(true);
  };

  const submitWithdrawAll = async () => {
    startTransaction();
    try {
      const _userInfo = await getUserInfo(account, props.pid, chainId, library);
      const withdrawTx = await withdraw(props.pid, _userInfo.amount, chainId, library);
      setTransactionHash(withdrawTx.transactionHash);
      props.onUnstake();
      fetchInfo();
      setTransactionInProgress(false);
    } catch (e) {
      console.error(e);

      openWarningModal(
        'Something went wrong while unstaking all, please check your balance and try again later'
      );

      fetchInfo();
    }
  };

  const submitDepositAll = async () => {
    startTransaction();
    if (isStakeAllApproved) {
      try {
        const userBal = await getUserBal(account, props.tokenAddress, chainId, library);
        const depositTx = await deposit(props.pid, userBal, chainId, library);
        setTransactionHash(depositTx.transactionHash);
        props.onStake();
        fetchInfo();
        setTransactionInProgress(false);
      } catch (e) {
        console.error(e);
        fetchInfo();

        openWarningModal(
          'Something went wrong while staking all, please check your balance and try again later'
        );
      }
    } else {
      try {
        const approveTx = await approveToken(account, props.tokenAddress, chainId, library);
        approveTx.wait().then(async () => {
          await fetchInfo();
          setTransactionInProgress(false);
        });
      } catch (e) {
        console.error(e);
        openWarningModal(
          'Something went wrong while approving, please check your balance and try again later'
        );
        setTransactionInProgress(false);
      }
    }
  };

  const submitApprove = async () => {
    startTransaction();
    try {
      const approveTx = await approveToken(account, props.tokenAddress, chainId, library);
      setTransactionHash(approveTx.transactionHash);
      setIsApproved(true);
      fetchInfo();
      setTransactionInProgress(false);
    } catch (e) {
      console.error(e);
      fetchInfo();
      openWarningModal(
        'Something went wrong while approving, please check your balance and try again later'
      );
    }
  };

  const submitDeposit = async () => {
    try {
      startTransaction();
      const depositTx = await deposit(
        props.pid,
        ethers.utils.parseUnits(amount, props.decimals),
        chainId,
        library
      );
      setTransactionHash(depositTx.transactionHash);
      props.onUnstake();
      fetchInfo();
      setDepositModalOpen(false);
      setTransactionInProgress(false);
    } catch (e) {
      console.error(e);
      openWarningModal(
        'Something went wrong while depositing, please check your balance and try again later'
      );
      fetchInfo();
      setDepositModalOpen(false);
    }
  };

  const submitWithdraw = async () => {
    try {
      startTransaction();
      const withdrawTx = await withdraw(
        props.pid,
        ethers.utils.parseUnits(amount, props.decimals),
        chainId,
        library
      );
      setTransactionHash(withdrawTx.transactionHash);

      props.onUnstake();
      fetchInfo();
      setWithdrawModalOpen(false);
      setTransactionInProgress(false);
    } catch (e) {
      console.error(e);
      openWarningModal(
        'Something went wrong while withdrawing, please check your deposited balance and try again later'
      );
      fetchInfo();
      setWithdrawModalOpen(false);
    }
  };

  const submitClaim = async () => {
    startTransaction();
    try {
      const depositTx = await deposit(props.pid, 0, chainId, library);
      setTransactionHash(depositTx.transactionHash);
      fetchInfo();
      setTransactionInProgress(false);
    } catch (e) {
      console.error(e);
      openWarningModal(
        'Something went wrong while claiming. Please make sure you have rewards to claim and try again.'
      );
      fetchInfo();
    }
  };
  const depositPreflightCheck = () => {
    if (parseFloat(amount) > parseFloat(stakeable)) {
      return false;
    }
    if (parseFloat(amount) === 0) {
      return false;
    }
    return true;
  };

  const withdrawPreflightCheck = () => {
    if (parseFloat(amount) > parseFloat(myDeposit)) {
      return false;
    }
    if (parseFloat(amount) === 0) {
      return false;
    }
    return true;
  };

  const handleAmount = async (_amount) => {
    if (!isNaN(_amount)) {
      if (_amount === '') {
        _amount = '0';
      }
      try {
        ethers.utils.parseUnits(_amount, props.decimals);
        setAmount(_amount);
        setIsApproved(
          await compareAllowance(
            _amount,
            props.decimals,
            account,
            props.tokenAddress,
            chainId,
            library
          )
        );
      } catch (e) {
        console.log('Error updating the deposit / withdraw amount: ', e);
      }
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [chainId, account, library]);

  return (
    <Container expandContent={expandContent}>
      <WarningModal
        isOpen={warningModalOpen}
        title={'Something Went Wrong!'}
        setModalOpen={(isOpen: boolean) => setWarningModalOpen(isOpen)}
      >
        {warningModalText}
      </WarningModal>
      <OhModal
        isOpen={transactionModalOpen}
        onDismiss={() => {
          // can only be dismissed if transaction is not in progress
          if (!transactionInProgress) {
            setTransactionModalOpen(false);
          }
        }}
        title={''}
      >
        {transactionInProgress ? (
          <SpinnerContainer>
            <Spinner />
            <p>Transaction in progress...</p>
          </SpinnerContainer>
        ) : (
          <TransactionCompleteContainer>
            <TransactionCompleteIcon>
              <HiCheckCircle />
            </TransactionCompleteIcon>
            <p>Transaction Complete!</p>
            <a
              target={'_blank'}
              rel={'noopener noreferrer'}
              href={`${CHAIN_INFO[chainId].explorer}tx/${transactionHash}`}
            >
              {transactionHash ? 'View on explorer' : 'Loading...'}
            </a>
          </TransactionCompleteContainer>
        )}
      </OhModal>
      <OhModal
        isOpen={depositModalOpen}
        onDismiss={() => {
          setDepositModalOpen(false);
          setAmount('0.0');
          setTransactionModalOpen(false);
        }}
        title={'Deposit'}
      >
        <ModalContent>
          <ModalInput value={amount} onChange={(e) => handleAmount(e.target.value)} type="text" />
          <ModalButtons onClick={() => setAmount(stakeable)}>Max: {stakeable}</ModalButtons>

          {isApproved ? (
            <ModalButtons disabled={!depositPreflightCheck()} onClick={submitDeposit}>
              Submit
            </ModalButtons>
          ) : (
            <ModalButtons onClick={submitApprove}>Approve</ModalButtons>
          )}
        </ModalContent>
      </OhModal>

      <OhModal
        isOpen={withdrawModalOpen}
        onDismiss={() => {
          setWithdrawModalOpen(false);
          setAmount('0.0');
          setTransactionModalOpen(false);
        }}
        title={'Withdraw'}
      >
        <ModalContent>
          <ModalInput value={amount} onChange={(e) => handleAmount(e.target.value)} type="text" />
          <ModalButtons onClick={() => setAmount(myDeposit)}>Max: {myDeposit}</ModalButtons>

          <ModalButtons disabled={!withdrawPreflightCheck()} onClick={submitWithdraw}>
            Submit
          </ModalButtons>
        </ModalContent>
      </OhModal>

      <UpperContainer>
        <ContainerLeft>
          <TokenInfo>
            <TokenIcon src={props.tokenIcon} alt="tokenIcon" />
            <TokenSymbol>{props.tokenSymbol}</TokenSymbol>
          </TokenInfo>
        </ContainerLeft>
        <>
          <ContentContainer>
            <GreyText>Pool Deposits</GreyText>
            <ValueText>$ {props.poolDeposits}</ValueText>
            <GreyText>
              {props.poolDeposits} {props.tokenSymbol}
            </GreyText>
          </ContentContainer>
          <ContentContainer>
            <GreyText>My Deposits</GreyText>
            <ValueText>$ {myDeposit}</ValueText>
            <GreyText>{props.tokenSymbol}</GreyText>
          </ContentContainer>
        </>
        <ActionButtonsContainer>
          <ActionButtons onClick={() => setDepositModalOpen(true)}>Deposit</ActionButtons>
          <ActionButtons onClick={() => setWithdrawModalOpen(true)}>Withdraw</ActionButtons>
        </ActionButtonsContainer>
      </UpperContainer>
      <LowerContainer expandContent={expandContent}>
        <HorizontalContainer>
          <RewardContainer>
            <Reward>REWARD</Reward>
            <TokenIcon src={props.rewardIcon} />
            {reward2Address ? <TokenIcon src={getTokenIcon(chainId, reward2Address)} /> : <></>}
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
                <GreyText>Median Boosted APR: </GreyText>{' '}
                {parseFloat(medianBoostedApr).toFixed(2) || '--'}% <BiHelpCircle />
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
            <ExpandLowerText expandContent={expandContent}>
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
                    <AiOutlineDownCircle />
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
              rightIcon={reward2Address ? getTokenIcon(chainId, reward2Address) : null}
              rightAmount={reward2Amount}
              rightSymbol={reward2Symbol}
              actionText={'Claim'}
              action={submitClaim}
              actionDisabled={parseFloat(pendingOh) == 0}
            />
            <StakePoolActionItem
              leftTitle="Staked"
              leftIcon={getTokenIcon(chainId, props.tokenAddress)}
              leftAmount={myDeposit}
              leftSymbol={props.tokenSymbol}
              rightTitle="Stakeable"
              rightAmount={stakeable}
              rightIcon={getTokenIcon(chainId, props.tokenAddress)}
              rightSymbol={props.tokenSymbol}
              divider={true}
              actionText={isStakeAllApproved ? 'Stake All' : 'Approve'}
              action={submitDepositAll}
              footer={`Earned ${props.rewardSymbol} will automatically be claimed on staking`}
              actionDisabled={isStakeAllApproved && parseFloat(stakeable) == 0}
            />
            <StakePoolActionItem
              leftTitle="Staked"
              leftIcon={getTokenIcon(chainId, props.tokenAddress)}
              leftAmount={myDeposit}
              leftSymbol={props.tokenSymbol}
              rightTitle="Stakeable"
              rightAmount={stakeable}
              rightIcon={getTokenIcon(chainId, props.tokenAddress)}
              rightSymbol={props.tokenSymbol}
              divider={true}
              actionText={'Unstake All'}
              action={submitWithdrawAll}
              footer={`Earned ${props.rewardSymbol} will automatically be claimed on staking`}
              actionDisabled={parseFloat(myDeposit) == 0}
            />
            <LowerShadowContainer expandContent={expandContent} />
          </HorizontalContainer>
        ) : (
          <></>
        )}
      </LowerContainer>
    </Container>
  );
};
export default StakePoolItem;
