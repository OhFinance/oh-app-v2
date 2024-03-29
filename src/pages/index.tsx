import { Bank, banks } from 'constants/banks';
import { CHAIN_INFO } from 'constants/chains';
import { useVirtualBalance } from 'hooks/calls/bank/useVirtualBalance';
import { useVirtualPrice } from 'hooks/calls/bank/useVirtualPrice';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { Flex } from 'rebass';
import { useBankAPYData } from 'state/banks/hooks';
import styled from 'styled-components';
import { ThemedText } from 'theme';
import Skeleton from '~/components/Skeleton';
import { useActiveWeb3React } from '~/hooks/web3';
import { useChartStore } from '~/stores/useChartStore';
import { useCirculatingSupplyStore } from '~/stores/useCirculatingSupplyStore';
import { useMarketCapStore } from '~/stores/useMarketCapStore';
import { usePriceStore } from '~/stores/usePriceStore';
import { useTVLStore } from '~/stores/useTVLStore';

const APRContainer = styled.div(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '17px 20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  backgroundColor: theme.bg2,
  borderRadius: 20,
  marginTop: 8,
}));

const APRTitle = styled.h5(({ theme }) => ({
  color: theme.grey,
  fontSize: '20px',
  lineHeight: '20px',
  margin: 0,
  fontWeight: 500,
}));

const APRValue = styled.h3(({ theme }) => ({
  fontSize: '28px',
  lineHeight: '28px',
  color: theme.white,
  margin: 0,
  fontWeight: 600,
  textAlign: 'right',
}));

const Wrapper = styled.div`
  position: relative;
`;

const SubHeading = styled(ThemedText.Subhead1)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.67  )',
  paddingTop: 8,
  fontSize: '20px',
}));

const BanksGrid = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  paddingTop: 32,
}));

const BankWrapper = styled.div(({ theme }) => ({
  flex: '0 1 300px',
  padding: 6,
}));
const BankContent = styled.div(({ theme }) => ({
  backgroundColor: theme.bg1,
  borderRadius: 20,
  width: '100%',
  overflow: 'hidden',
  cursor: 'pointer',
}));

const HeaderImage = styled.div<{ image: string }>(({ theme, image }) => ({
  width: '100%',
  aspectRatio: '16/9',
  // backgroundImage: `url(/img/headers/${contract}.${extension || 'png'})`,
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',

  backgroundPosition: 'center center',
}));

const Banner = styled.div(({ theme }) => ({
  color: theme.white,
  width: '100%',
  padding: '32px 32px',
  fontWeight: 700,
  fontSize: '2rem',
  backgroundColor: 'rgb(72,138,221)',
  background:
    'linear-gradient(90deg, rgba(72,138,221,1) 0%, rgba(141,94,184,1) 35%, rgba(171,37,117,1) 100%)',
  borderRadius: 20,
  boxShadow: '0px 12px 24px 0px rgba(255, 255, 255, 0.26)',
}));

const BankText = styled.div(({ theme }) => ({
  width: '100%',
  padding: '0px 16px 16px 16px',
}));

const BankLabel = styled.div(({ theme }) => ({
  fontSize: '24px',
  color: theme.white,
  fontWeight: 400,
}));

const ProtocolLabel = styled.div(({ theme }) => ({
  fontSize: '18px',
  color: theme.grey,
  fontWeight: 400,
  marginBottom: 30,
}));

const Stat = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.grey,
  fontSize: '14px',
  lineHeight: '16px',
  textAlign: 'left',
  padding: '0px 0px 8px',
  '& span': {
    color: theme.white,
  },
}));

const BankLogo = styled.div(({ theme }) => ({
  width: '55px',
  height: '55px',
  padding: '2px',
  marginBottom: -20,
  position: 'relative',
  top: '-20px',
  borderRadius: 50,
  backgroundColor: `${theme.bg1}`,
  '& img': {
    width: '100%',
    height: 'auto',
  },
}));

const ChainLogo = styled.img({
  height: 28,
  width: 'auto',
  marginLeft: 4,
});
function Bank({ bank }: { bank: Bank }) {
  const router = useRouter();
  // Start Statistics (TVL, Share Price, APY)
  const totalValueLocked = useVirtualBalance(bank.ohToken);
  const sharePrice = useVirtualPrice(bank.ohToken);
  const apys = useBankAPYData(bank.ohToken.chainId, bank.ohToken.address);
  const apyString = useMemo(() => {
    if (apys && apys[0]) {
      return `${apys[0].apy?.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}%`;
    }
    return <Skeleton width="100%" height="100%" />;
  }, [apys]);
  // END STATISTICS

  return (
    <BankWrapper>
      <div
        onClick={() => {
          router.push({
            pathname: '/bank/[address]',
            query: { address: bank.contractAddress },
          });
        }}
      >
        <BankContent>
          <HeaderImage image={bank.header} />
          <BankText>
            <BankLogo>
              <img src={bank.image} alt={bank.name} />
            </BankLogo>
            <BankLabel>{bank.name}</BankLabel>
            <ProtocolLabel>
              {bank.strategies.map((s, i, l) => s.protocol + (i !== l.length - 1 ? ', ' : ''))}
            </ProtocolLabel>
            <Stat>
              TVL{' '}
              {totalValueLocked ? (
                <span>${totalValueLocked.toFixed(2, { groupSeparator: ',' })}</span>
              ) : (
                <Skeleton width={30} style={{ display: 'inline-block' }} />
              )}
            </Stat>
            <Stat>
              Share Price{' '}
              {sharePrice ? (
                <span>${sharePrice.toFixed(3, { groupSeperator: ',' })}</span>
              ) : (
                <Skeleton width={30} style={{ display: 'inline-block' }} />
              )}
            </Stat>
            <APRContainer>
              <APRTitle>
                <span style={{ fontSize: '14px' }}>Earning Rate</span>
                <br /> APY
              </APRTitle>

              <APRValue>{apyString}</APRValue>
            </APRContainer>
          </BankText>
        </BankContent>
      </div>
    </BankWrapper>
  );
}

const Home: NextPage = React.forwardRef(function Home() {
  // Stores
  const fetchChart = useChartStore((state) => state.fetchData);
  const fetchPrice = usePriceStore((state) => state.fetchData);
  const fetchMarketCap = useMarketCapStore((state) => state.fetchData);
  const fetchSupply = useCirculatingSupplyStore((state) => state.fetchData);
  const fetchTVL = useTVLStore((state) => state.fetchData);

  // Hooks

  const { chainId } = useActiveWeb3React();

  const chain = chainId ? CHAIN_INFO[chainId] : undefined;
  const chainBanks = useMemo(() => {
    if (chainId) {
      return banks[chainId];
    } else {
      return undefined;
    }
  }, [chainId]);
  // This effect will run only once
  useEffect(() => {
    fetchPrice();
    fetchMarketCap();
    fetchSupply();
    fetchTVL();
  }, [fetchChart, fetchPrice, fetchMarketCap, fetchSupply, fetchTVL]);
  if (!chainBanks || !chain) {
    return <h1>No banks</h1>;
  }
  return (
    <Wrapper>
      <Banner>
        <ThemedText.H1 fontWeight={500}>Banks</ThemedText.H1>
        <Flex alignItems="center" flexWrap="nowrap">
          <SubHeading fontSize="20px">All banks available on {chain.label}</SubHeading>
          <ChainLogo src={chain.logoUrl} alt={chain.label} />
        </Flex>
      </Banner>

      <BanksGrid>
        {chainBanks.map((bank, i) => (
          <Bank bank={bank} key={`bank-${bank.contractAddress}-${i}`} />
        ))}
      </BanksGrid>
    </Wrapper>
  );
}) as NextPage;

export default Home;
