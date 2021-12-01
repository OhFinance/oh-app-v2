import { useEagerConnect } from 'hooks/useEagerConnect';
import { useWeb3 } from 'hooks/useWeb3';
import { useWeb3StoreConnector } from 'hooks/useWeb3StoreConnector';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { usePollBlockNumber } from 'state/block/hooks';
import { ConnectWalletDialog } from '~/components/connectWalletDialog';
import { MarketingBody } from '~/components/marketingBody';
import { WithoutWeb3 } from '~/components/withoutWeb3';
import { WithWeb3 } from '~/components/withWeb3';
import { useChartStore } from '~/stores/useChartStore';
import { useCirculatingSupplyStore } from '~/stores/useCirculatingSupplyStore';
import { useMarketCapStore } from '~/stores/useMarketCapStore';
import { usePriceStore } from '~/stores/usePriceStore';
import { useTVLStore } from '~/stores/useTVLStore';
import { useUsdcStore } from '~/stores/useUsdcStore';
import { useWalletStore } from '~/stores/useWalletStore';

const Home: NextPage = React.forwardRef(function Home() {
  // Stores
  const showConnectWalletDialog = useWalletStore((state) => state.showConnectWalletDialog);
  const fetchChart = useChartStore((state) => state.fetchData);
  const fetchPrice = usePriceStore((state) => state.fetchData);
  const fetchMarketCap = useMarketCapStore((state) => state.fetchData);
  const fetchSupply = useCirculatingSupplyStore((state) => state.fetchData);
  const fetchTVL = useTVLStore((state) => state.fetchData);
  const bank = useUsdcStore((state) => state.bank);

  // Hooks
  usePollBlockNumber();
  useEagerConnect();
  useWeb3StoreConnector();
  const { active, account, library } = useWeb3();
  const hasWeb3 = active && account && library && bank;

  // This effect will run only once
  useEffect(() => {
    fetchChart();
    fetchPrice();
    fetchMarketCap();
    fetchSupply();
    fetchTVL();
  }, [fetchChart, fetchPrice, fetchMarketCap, fetchSupply, fetchTVL]);

  return (
    <main className={`relative overflow-hidden`}>
      {hasWeb3 ? <WithWeb3 /> : <WithoutWeb3 />}
      {showConnectWalletDialog && <ConnectWalletDialog />}
      <MarketingBody />
    </main>
  );
}) as NextPage;

export default Home;
