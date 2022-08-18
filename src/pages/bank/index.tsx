import Skeleton from 'components/Skeleton';
import { useVirtualPrice } from 'hooks/calls/bank/useVirtualPrice';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { transparentize } from 'polished';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Flex } from 'rebass';
import { useChart, useFetchChartCallback } from 'state/application/hooks';
import { ChartTimeRange } from 'state/application/reducer';
import { Field } from 'state/stake/reducer';
import { useTokenBalance } from 'state/wallet/hooks';
import { useCirculatingSupplyStore } from 'stores/useCirculatingSupplyStore';
import { useMarketCapStore } from 'stores/useMarketCapStore';
import { usePriceStore } from 'stores/usePriceStore';
import { useTVLStore } from 'stores/useTVLStore';
import styled from 'styled-components';
import ohLogo from '~/assets/img/oh-token.svg';
import Button from '~/components/Button';
import PigPic from '~/components/_modals/common/animations/pig.svg';
import { useActiveWeb3React } from '~/hooks/web3';
import { ThemedText } from '~/theme';
import UnstyledButton from '../../components/UnstyledButton';
import { banksByChainContract } from '../../constants/banks';
import { SupportedChainId } from '../../constants/chains';
import { switchToNetwork } from '../../utilities/switchToNetwork';
import DepositCard from './[address]/DepositCard';

// nextjs bullies us if we don't do this
const Chart: any = dynamic(() => import('./[address]/Chart'), { ssr: false });

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: 20,
});

const Left = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
});

const ContainerBase = styled.div(({ theme }) => ({
  backgroundColor: theme.bg1,
  borderRadius: 20,
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: 'inset 0px 0px 50px #001F71',
  padding: 20,
}));

const Logo = styled.img<{ size?: 'small' | 'big' }>(({ size }) => ({
  width: size && size === 'small' ? 24 : 50,
  height: size && size === 'small' ? 24 : 50,
  boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.14)',
}));

const RightContainer = styled(ContainerBase)({
  display: 'flex',
  flexDirection: 'column',
  padding: 30,
});

const DepositBalance = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: '20px',
  lineHeight: '20px',
  fontWeight: 400,
  marginLeft: 10,
  color: theme.white,
}));

const ChartContainer = styled.div(({ theme }) => ({
  padding: 20,
  width: '100%',
  backgroundColor: theme.bg1,
  borderRadius: 20,
  boxSizing: 'border-box',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const StatsContainer = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: 10,
  backgroundColor: theme.bg3,
  borderRadius: 20,
  padding: 10,
  boxSizing: 'border-box',
  width: '100%',
  marginTop: 10,
  boxShadow: 'inset 0px 0px 50px #001F71',
}));

const StatsItem = styled.div<{ noBg?: boolean }>(({ theme, noBg }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '25px 30px 28px 30px',
  backgroundColor: noBg ? 'transparent' : theme.bg1,
  borderRadius: 20,
  boxSizing: 'border-box',
}));

const StatsTitle = styled.p(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '16px',
  color: theme.blue,
  fontWeight: 400,
  margin: 0,
  paddingBottom: 4,
}));

const StatsValue = styled.p(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '14px',
  color: theme.white,
  fontWeight: 400,
  margin: 0,
}));

const TitleText = styled.h5(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '20px',
  margin: 0,
  fontWeight: 500,
}));

const PortfolioTitle = styled(TitleText)(({ theme }) => ({
  color: theme.grey,
  paddingRight: 16,
  fontWeight: 400,
}));

const PortfolioBalance = styled.h3(({ theme }) => ({
  color: theme.white,
  margin: 0,
  fontWeight: 400,
  fontSize: '56px',
  lineHeight: '56px',
}));

const TimeframeButtons = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const TimeframeButton = styled(UnstyledButton)<{ active?: boolean }>(({ theme, active }) => ({
  color: theme.grey,
  borderRadius: 15,
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: 500,
  backgroundColor: active ? theme.bg4 : 'transparent',
  marginRight: '5px',
  '&:hover': {
    backgroundColor: transparentize(0.3, theme.bg4),
  },
}));

const FourOhFourContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 600,
  padding: 16,
  '& img': {
    width: '200px',
    height: 'auto',
    marginBottom: 24,
  },
  '& button': {
    marginTop: 16,
  },
});

const ranges: {
  label: string;
  value: ChartTimeRange;
}[] = [
  {
    label: '1HR',
    value: 'hour',
  },
  {
    label: '1D',
    value: 'day',
  },
  {
    label: '1W',
    value: 'week',
  },
  {
    label: '1M',
    value: 'month',
  },
  {
    label: 'All',
    value: 'all',
  },
];

export default function BankPage() {
  const { account, library, chainId } = useActiveWeb3React();
  const router = useRouter();
  const address = router.query.address[0];

  const bank = useMemo(
    () => (typeof address === 'string' && chainId ? banksByChainContract[chainId][address] : null),
    [address, chainId]
  );

  const [selectedRange, setSelectedRange] = useState<ChartTimeRange>('hour');
  const fetchTvlChart = useFetchChartCallback();

  const fetchTvlChartCallback: (tries?: number) => Promise<boolean> = useCallback(
    async (tries: number = 0): Promise<boolean> => {
      return fetchTvlChart(chainId, bank?.contractAddress)
        .then(() => true)
        .catch((err) => {
          if (tries >= 5) {
            console.error(err);
            return false;
          }
          console.debug('Error fetch TVL chart, retrying...', err.message);
          return fetchTvlChartCallback(tries + 1);
        });
    },
    [fetchTvlChart, chainId, bank]
  );

  const chart = useChart(selectedRange);

  const { isLoading: isLoadingTVL, tvl } = useTVLStore();
  const { isLoading: isLoadingPrice, price } = usePriceStore();
  const { isLoading: isLoadingMarketCap, marketCap } = useMarketCapStore();
  const { isLoading: isLoadingSupply, supply } = useCirculatingSupplyStore();
  const balance = useTokenBalance(account || undefined, bank?.ohToken);
  const sharePrice = useVirtualPrice(bank?.ohToken);

  const portfolioValue = useMemo(() => {
    if (balance && sharePrice) {
      return Number(sharePrice.toFixed(3)) * Number(balance.toFixed(3));
    }
    return undefined;
  }, [balance, sharePrice]);

  useEffect(() => {
    if (chainId && bank && bank.ohToken.chainId !== chainId && chainId in SupportedChainId) {
      if (!library) return;
      switchToNetwork({ library, chainId: bank.ohToken.chainId });
    }
  }, [chainId, bank, library]);

  useEffect(() => {
    fetchTvlChartCallback();
  }, [fetchTvlChartCallback]);

  if (!bank) {
    const handleClick = () => {
      router.push('/');
    };
    return (
      <Flex
        flexDirection={'column'}
        alignItems="center"
        justifyContent={'center'}
        height="100%"
        flexGrow={1}
      >
        <FourOhFourContent>
          <img src={PigPic} alt="sad piggy" />
          <ThemedText.H1>
            Ah <b>OH!</b> This bank was not found.
          </ThemedText.H1>
          <Button onClick={handleClick} size="large">
            <b>Back to banks</b>
          </Button>
        </FourOhFourContent>
      </Flex>
    );
  }
  return (
    <Grid>
      {/* <OhModal title="Deposit USDC.e" isOpen onDismiss={() => false}>
        <DepositView />
      </OhModal> */}

      <Left>
        <DepositCard bank={bank} field={Field.DEPOSIT} />
        <DepositCard bank={bank} field={Field.WITHDRAW} />
      </Left>
      <RightContainer>
        <Flex alignItems="flex-end" marginBottom={25}>
          <PortfolioTitle>
            <span style={{ fontSize: '28px' }}>Portfolio</span>
            <br />
            Balance
          </PortfolioTitle>
          <PortfolioBalance>
            {portfolioValue !== undefined ? (
              '$ ' +
              portfolioValue.toLocaleString('en-US', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })
            ) : (
              <Skeleton width={60} />
            )}
          </PortfolioBalance>
          <Flex marginLeft="auto">
            <Logo src={bank.image} alt={bank.name} size="small" />
            <DepositBalance>
              {balance ? (
                balance.toFixed(3, { groupSeperator: ',' })
              ) : (
                <Skeleton width={60} style={{ display: 'inline-block' }} />
              )}{' '}
              {bank.ohToken.symbol} (Deposited {bank.underlyingToken.symbol})
            </DepositBalance>
          </Flex>
        </Flex>
        <ChartContainer>
          <TimeframeButtons>
            {ranges.map(({ value, label }, i) => (
              <TimeframeButton
                key={`${value}-${i}`}
                onClick={() => setSelectedRange(value)}
                active={selectedRange === value}
              >
                {label}
              </TimeframeButton>
            ))}
          </TimeframeButtons>
          <Chart data={chart} timeframe={selectedRange} />
        </ChartContainer>
        <StatsContainer>
          <StatsItem>
            <Flex alignItems="center">
              <Logo src={ohLogo} alt="placeholder" />
              <div style={{ marginLeft: 10 }}>
                <StatsTitle>Token Price</StatsTitle>
                <StatsValue>
                  ${' '}
                  {!isLoadingPrice &&
                    price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </StatsValue>
              </div>
            </Flex>
          </StatsItem>
          <StatsItem>
            <StatsTitle>Circulating Supply</StatsTitle>
            <StatsValue>
              {!isLoadingSupply &&
                supply.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
              OH
            </StatsValue>
          </StatsItem>
          <StatsItem>
            <StatsTitle>Market Cap</StatsTitle>
            <StatsValue>
              ${' '}
              {!isLoadingMarketCap &&
                marketCap.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </StatsValue>
          </StatsItem>
          <StatsItem noBg>
            <StatsTitle>Total Value Locked</StatsTitle>
            <StatsValue>
              ${' '}
              {!isLoadingTVL &&
                tvl.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </StatsValue>
          </StatsItem>
        </StatsContainer>
      </RightContainer>
    </Grid>
  );
}
