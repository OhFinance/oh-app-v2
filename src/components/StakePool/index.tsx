import StakePoolItem from 'components/StakePoolItem';
import styled from 'styled-components';
import usdcIcon from '../../assets/img/eth.svg';
import daiIcon from '../../assets/img/oh-dai-e.png';
import ohUsdcIcon from '../../assets/img/oh-usdc-e.svg';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '800px',
  marginTop: '40px',
});

const StakePool = () => {
  return (
    <Container>
      <StakePoolItem
        tokenSymbol={'USDT'}
        tokenIcon={ohUsdcIcon}
        coverageRatio={'116.18'}
        poolDeposits={'6.32'}
        myDeposits={'0.00'}
        rewardIcon={ohUsdcIcon}
        rewardSymbol={'USDC'}
        rewardAmount={'123'}
        rewardIcon2={ohUsdcIcon}
        reward2Symbol={'USDC'}
        reward2Amount={'321'}
        baseApr={'7.83'}
        medianBoostedApr={'6.53'}
        myBoostedApr={'0.0'}
        stakedAmount={'123'}
        stakedTokenIcon={usdcIcon}
        stakedTokenSymbol={'ETH'}
        stakeableAmount={'321'}
        stakeableTokenSymbol={'DAI'}
        stakeableTokenIcon={daiIcon}
        claimFunction={() => console.log('Claim Funciton')}
        stakeAllFunction={() => console.log('Stake All')}
        unstakeAllFunction={() => console.log('Unstake All')}
      />
      <StakePoolItem
        tokenSymbol={'USDT'}
        tokenIcon={ohUsdcIcon}
        coverageRatio={'116.18'}
        poolDeposits={'6.32'}
        myDeposits={'0.00'}
        rewardIcon={ohUsdcIcon}
        rewardSymbol={'USDC'}
        rewardAmount={'123'}
        rewardIcon2={ohUsdcIcon}
        reward2Symbol={'USDC'}
        reward2Amount={'123'}
        baseApr={'7.83'}
        medianBoostedApr={'6.53'}
        myBoostedApr={'0.0'}
        stakedAmount={'123'}
        stakedTokenIcon={usdcIcon}
        stakedTokenSymbol={'ETH'}
        stakeableAmount={'321'}
        stakeableTokenSymbol={'DAI'}
        stakeableTokenIcon={daiIcon}
        claimFunction={() => console.log('Claim Funciton')}
        stakeAllFunction={() => console.log('Stake All')}
        unstakeAllFunction={() => console.log('Unstake All')}
      />
      <StakePoolItem
        tokenSymbol={'USDT'}
        tokenIcon={ohUsdcIcon}
        coverageRatio={'116.18'}
        poolDeposits={'6.32'}
        myDeposits={'0.00'}
        rewardIcon={ohUsdcIcon}
        rewardSymbol={'USDC'}
        rewardAmount={'123'}
        rewardIcon2={ohUsdcIcon}
        reward2Symbol={'USDC'}
        reward2Amount={'123'}
        baseApr={'7.83'}
        medianBoostedApr={'6.53'}
        myBoostedApr={'0.0'}
        stakedAmount={'123'}
        stakedTokenIcon={usdcIcon}
        stakedTokenSymbol={'ETH'}
        stakeableAmount={'321'}
        stakeableTokenSymbol={'DAI'}
        stakeableTokenIcon={daiIcon}
        claimFunction={() => console.log('Claim Funciton')}
        stakeAllFunction={() => console.log('Stake All')}
        unstakeAllFunction={() => console.log('Unstake All')}
      />
    </Container>
  );
};

export default StakePool;
