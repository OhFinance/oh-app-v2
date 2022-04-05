import { banks } from 'constants/banks';
import { useVirtualPrice } from 'hooks/calls/bank/useVirtualPrice';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Flex } from 'rebass';
import { Field } from 'state/stake/reducer';
import { useTokenBalance } from 'state/wallet/hooks';
import { useCirculatingSupplyStore } from 'stores/useCirculatingSupplyStore';
import { useMarketCapStore } from 'stores/useMarketCapStore';
import { usePriceStore } from 'stores/usePriceStore';
import { useTVLStore } from 'stores/useTVLStore';
import styled from 'styled-components';
import ohLogo from '~/assets/img/oh-token.svg';
import { useActiveWeb3React } from '~/hooks/web3';
import DepositCard from './DepositCard';

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

export default function BankPage() {
  const { account, chainId } = useActiveWeb3React();
  const router = useRouter();
  const { address } = router.query;
  const bank = useMemo(
    () => (address && chainId ? banks[chainId].find((b) => b.contractAddress === address) : null),
    [address, chainId]
  );

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

  if (!bank) {
    return <h1>Not a bank</h1>;
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
            ${' '}
            {portfolioValue?.toLocaleString('en-US', {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            })}
          </PortfolioBalance>
          <Flex marginLeft="auto">
            <Logo src={bank.image} alt={bank.name} size="small" />
            <DepositBalance>
              {balance ? balance.toFixed(3, { groupSeperator: ',' }) : '0.000'}{' '}
              {bank.ohToken.symbol} (Deposited {bank.underlyingToken.symbol})
            </DepositBalance>
          </Flex>
        </Flex>
        <ChartContainer></ChartContainer>
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
