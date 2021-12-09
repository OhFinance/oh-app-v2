import { useEagerConnect } from 'hooks/useEagerConnect';
import { useWeb3 } from 'hooks/useWeb3';
import { useWeb3StoreConnector } from 'hooks/useWeb3StoreConnector';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { usePollBlockNumber } from 'state/block/hooks';
import Alert from '~/components/Alert';
import { ConnectWalletDialog } from '~/components/connectWalletDialog';
import { MarketingBody } from '~/components/marketingBody';
import WalletModal from '~/components/WalletModal';
import { WithoutWeb3 } from '~/components/withoutWeb3';
import { WithWeb3 } from '~/components/withWeb3';
import { useAlerts } from '~/state/application/hooks';
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

  const alerts = useAlerts();
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
      <WalletModal />
      <div className="fixed z-20 bottom-0 right-4 mb-5">
        {alerts.map((alert) => (
          <Alert
            key={alert.key}
            alertKey={alert.key}
            {...alert.props}
            show={alert.show}
            removeAfterMs={alert.removeAfterMs}
          />
        ))}
      </div>
    </main>
  );
}) as NextPage;

export default Home;
