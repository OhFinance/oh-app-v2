import { useWalletStore } from '~/stores/useWalletStore';
import styles from './__styles__/chartPnL.module.css';

export function ChartPnL() {
  const { walletConnected, portfolioPl, portfolioPlPercent } = useWalletStore();

  return (
    <div className="w-auto h-10 flex flex-row">
      {!walletConnected ? (
        <p className={`ml-5 mt-4 absolute text-lg text-pink-500`}>
          Connect wallet to see your data
        </p>
      ) : portfolioPl !== 0 ? (
        <>
          <div
            className={`ml-6 mt-4 absolute ${styles[portfolioPl > 0 ? 'arrow-up' : 'arrow-down']}`}
          />
          <p
            className={`ml-12 mt-2 absolute text-lg ${
              styles[portfolioPl > 0 ? 'pl-up' : 'pl-down']
            }`}
          >
            {portfolioPl} ({portfolioPlPercent}%)
          </p>
        </>
      ) : null}
    </div>
  );
}
