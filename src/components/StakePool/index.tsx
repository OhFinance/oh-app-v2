import { useEffect, useState } from 'react';
import { useActiveWeb3React } from 'hooks/web3';

import StakePoolItem from 'components/StakePoolItem';
import styled from 'styled-components';
import usdcIcon from '../../assets/img/eth.svg';
import daiIcon from '../../assets/img/oh-dai-e.png';
import ohUsdcIcon from '../../assets/img/oh-usdc-e.svg';
import { Pool, getPoolInfo } from 'apis/MasterOh';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '800px',
  marginTop: '40px',
});

const StakePool = () => {
  const { chainId, account, library } = useActiveWeb3React();

  const [pools, setPools] = useState<Pool[]>([]);
  const [staked, setStaked] = useState(0);
  //const

  const fetchInfo = async () => {
    if (!chainId || !library) {
      return;
    }
    const _pools = await getPoolInfo(chainId, library);
    setPools(_pools);
  };

  useEffect(() => {
    fetchInfo();
  }, [chainId, library]);

  return (
    <Container>
      {pools.map((pool, i) => (
        <StakePoolItem
          key={i}
          pid={pool.pid}
          decimals={pool.decimals}
          tokenAddress={pool.lpToken}
          tokenSymbol={pool.symbol}
          tokenIcon={ohUsdcIcon}
          coverageRatio={'116.18'}
          poolDeposits={pool.tvl || 0}
          rewardIcon={ohUsdcIcon}
          rewardSymbol={'OH!'}
          rewardAmount={'123'}
          // rewardIcon2={ohUsdcIcon}
          // reward2Symbol={'USDC'}
          // reward2Amount={'321'}
          baseApr={'7.83'}
          medianBoostedApr={'6.53'}
          myBoostedApr={'0.0'}
          stakedAmount={'123'}
          stakedTokenIcon={usdcIcon}
          stakedTokenSymbol={'ETH'}
          stakeableAmount={'321'}
          stakeableTokenSymbol={'DAI'}
          stakeableTokenIcon={daiIcon}
          onStake={fetchInfo}
          onUnstake={fetchInfo}
          onClaim={fetchInfo}
          claimFunction={() => console.log('Claim Funciton')}
          stakeAllFunction={() => console.log('Stake All')}
          unstakeAllFunction={() => console.log('Unstake All')}
        />
      ))}
    </Container>
  );
};

export default StakePool;
