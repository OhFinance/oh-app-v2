import { useActiveWeb3React } from 'hooks/web3';
import { useEffect, useState } from 'react';

import { getPoolInfo, Pool } from 'apis/MasterOh';
import Spinner from 'components/Spinner';
import StakePoolItem from 'components/StakePoolItem';
import { getTokenIcon } from 'constants/tokens';
import styled from 'styled-components';
import ohUsdcIcon from '../../assets/img/oh-usdc-e.svg';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '800px',
  marginTop: '40px',
});
const SpinnerContainer = styled.div({
  marginTop: '150px',
});

const StakePool = () => {
  const { chainId, account, library } = useActiveWeb3React();

  const [pools, setPools] = useState<Pool[]>([]);
  const [loadingPools, setLoadingPools] = useState(true);
  const [staked, setStaked] = useState(0);

  const fetchInfo = async () => {
    if (!chainId || !library) {
      return;
    }
    const _pools = await getPoolInfo(chainId, library);
    setPools(_pools);
  };

  useEffect(() => {
    fetchInfo()
      .then(() => setLoadingPools(false))
      .catch(() => setLoadingPools(false));
  }, [chainId, library, account]);

  return (
    <Container>
      {loadingPools ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : account ? (
        pools.length > 0 ? (
          pools.map((pool, i) => {
            return (
              <StakePoolItem
                key={i}
                pid={pool.pid}
                decimals={pool.decimals}
                tokenAddress={pool.lpToken}
                tokenSymbol={pool.symbol}
                tokenIcon={getTokenIcon(chainId, pool.lpToken)}
                poolDeposits={pool.tvl || 0}
                rewardIcon={ohUsdcIcon}
                rewardSymbol={'OH!'}
                rewardAmount={'123'}
                onStake={fetchInfo}
                onUnstake={fetchInfo}
                onClaim={fetchInfo}
              />
            );
          })
        ) : (
          <p>There are no available pools for the current network</p>
        )
      ) : (
        <p>Please connect your wallet and switch to an approved network</p>
      )}
    </Container>
  );
};

export default StakePool;
