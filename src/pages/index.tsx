import { useEagerConnect } from 'hooks/useEagerConnect';
import { useWeb3StoreConnector } from 'hooks/useWeb3StoreConnector';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { CaptureResize } from '~/components/captureResize';
import { Chart } from '~/components/chart';
import { ConnectWalletDialog } from '~/components/connectWalletDialog';
import { HintButton } from '~/components/hintButton';
import { MarketingBody } from '~/components/marketingBody';
import { UsdcInput } from '~/components/usdcInput';
import styles from '~/pages/__styles__/index.module.css';
import { ChartTimeRange, useChartStore } from '~/stores/useChartStore';
import { useCirculatingSupplyStore } from '~/stores/useCirculatingSupplyStore';
import { useMarketCapStore } from '~/stores/useMarketCapStore';
import { usePriceStore } from '~/stores/usePriceStore';
import { useTVLStore } from '~/stores/useTVLStore';
import { useUsdcStore } from '~/stores/useUsdcStore';
import { useWalletStore } from '~/stores/useWalletStore';
import { h1, h2, h3, textCash, textCashLg, textCashMd, textPink } from '~/tempTailwindConfig';
import { formatCurrency, limitDecimals } from '~/utilities/numberUtilities';

const depositUsdcHint = 'Deposit USDC tokens to start earning.';
const withdrawUsdcHint = 'Withdraw your USDC tokens any time.';
const claimOhHint = "You'll soon be able to claim OH! Tokens.";

function onClickDeposit() {
  //TODO: Oh! Finance will fill in Deposit logic here
  console.log('clicked Deposit');
  useWalletStore.getState().depositUdsc();
}

function onClickWithraw() {
  //TODO: Oh! Finance will fill in Withdraw logic here
  console.log('clicked Withdraw');
  useWalletStore.getState().widthdrawUsdc();
}

function onClickClaimOh() {
  //TODO: Oh! Finance will fill in Claim Oh! logic here
  console.log('clicked Claim Oh!');
}

const Home: NextPage = React.forwardRef(function Home() {
  useEagerConnect();
  useWeb3StoreConnector();

  const {
    walletConnected,
    showConnectWalletDialog,
    portfolioBalance,
    interestEarned,
    availableOh,
    toBeDeposited,
    toBeWithdrawn,
    setToBeDeposited,
    setToBeWithdrawn,
    toggleConnectWalletDialog,
  } = useWalletStore();
  const { isLoading: isLoadingChart, data, fetchData: fetchChart } = useChartStore();
  const { isLoading: isLoadingPrice, price, fetchData: fetchPrice } = usePriceStore();
  const { isLoading: isLoadingUsdc, usdcBalance } = useUsdcStore();
  const {
    isLoading: isLoadingMarketCap,
    marketCap,
    fetchData: fetchMarketCap,
  } = useMarketCapStore();
  const {
    isLoading: isLoadingSupply,
    supply,
    fetchData: fetchSupply,
  } = useCirculatingSupplyStore();
  const { isLoading: isLoadingTVL, tvl, fetchData: fetchTVL } = useTVLStore();

  const [chartTimeRange, setChartTimeRange] = useState('all' as ChartTimeRange);
  const [depositValid, setDepositValid] = useState(false);
  const [withdrawValid, setWithdrawValid] = useState(false);
  const chartRef = useRef(null as null | HTMLDivElement);
  const chartContainerRef = useRef(null as null | HTMLDivElement);

  // This effect will run only once when this component is mounted
  useEffect(() => {
    fetchPrice();
    fetchMarketCap();
    fetchSupply();
    fetchTVL();
  }, [fetchPrice, fetchMarketCap, fetchSupply, fetchTVL]);

  // This effect will run when the component is mounted, and any time the chartTimeRange changes
  useEffect(() => {
    fetchChart(chartTimeRange);
  }, [fetchChart, chartTimeRange]);

  return (
    <main className={`relative overflow-hidden`}>
      {!walletConnected && (
        <div className={`flex items-center h-auto`}>
          <div
            className={`container mx-auto px-6 flex flex-col justify-between items-center relative py-4`}
          >
            <div className={`flex flex-col`}>
              <h1
                className={`text-5xl md:text-6xl font-bold mx-auto text-defaultText text-center py-2`}
              >
                <span className={`text-accentText`}>Earn More</span> with your{' '}
                <span className={`text-accentText`}>DeFi</span> dollar
              </h1>
            </div>
            <p
              className={`pt-20 text-3xl max-w-3xl justify-center text-defaultText text-center py-2`}
            >
              Start by earning up to <span className={`text-accentText`}>10-21%</span> APY on USDC
              <br className={styles['cta-line-break']}></br> + a bonus{' '}
              <span className={`text-accentText`}>10-30%*</span> OH! reward in just{' '}
              <span className={`text-accentText`}>two clicks!</span>
            </p>
            <div className={`mt-10 flex flex-col shadow-lg rounded-lg p-10 w-96 bg-buttonBG`}>
              <button
                className={`py-1 px-2 rounded-lg bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight`}
                onClick={toggleConnectWalletDialog}
              >
                Connect Wallet to get started
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${styles['main-container']} ${
          walletConnected ? 'mt-2' : 'mt-36'
        } mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-consoleBGOuter h-auto items-center`}
      >
        <div className={`${styles['first-container']} p-6 w-full h-full`}>
          <div className={`${styles['second-container']} w-full h-full flex`}>
            <div
              className={`${styles['account-actions-container']} h-auto container flex flex-col justify-between h-auto`}
            >
              <div
                className={`${styles['account-action-container']} h-auto flex flex-col rounded-lg bg-consoleBGInner border-2 border-consoleBorderInner`}
              >
                <div className={`${styles['third-container']} h-full m-2 flex rounded-lg bg-black`}>
                  <div
                    className={`w-full h-full flex flex-col rounded-lg border-2 border-consoleBorderAccent bg-consoleAccent`}
                  >
                    <div className={`w-full h-full flex flex-row`}>
                      <div className={`w-full flex flex-row justify-start`}>
                        <div className="flex flex-col">
                          <img
                            className="ml-1 mt-2"
                            width={72}
                            height={72}
                            alt="OH! Token Logo"
                            src="/img/oh_usdc_token.png"
                          />
                        </div>
                        <div className="ml-1 flex flex-col">
                          <p className={`${h3} mt-4 w-full h-8`}>Deposit USDC</p>
                          {walletConnected && (
                            <p className={`${textCashMd}`}>
                              ${isLoadingUsdc ? ' ---' : limitDecimals(usdcBalance)} Available
                            </p>
                          )}
                          {!walletConnected && <p className={`${textCashMd}`}>Earn APR</p>}
                        </div>
                        <div className="ml-8 mt-8 flex">
                          <HintButton hint={depositUsdcHint} />
                        </div>
                      </div>
                    </div>
                    <div className={`w-full h-full flex flex-col`}>
                      <div className={`w-full h-full flex flex-col`}>
                        <p className={`${h3} w-full mt-2 h-8 text-center`}>Earning Rate</p>
                        <div
                          className={`ml-3 mr-3 mb-3 w-auto h-auto flex flex-col justify-between border-4 border-selectionHighlight rounded-lg`}
                        >
                          <div className="mt-2 w-full h-auto flex flex-col ">
                            <p className={`text-center text-xl text-defaultText`}>10-21% APR</p>
                            <p className={`text-center text-xs text-defaultText`}>in-kind</p>
                          </div>
                          <div className="mt-4 mb-2 w-full h-auto">
                            <p className={`text-center text-xl text-defaultText`}>
                              + Bonus 10-21% APR
                            </p>
                            <p className={`text-center text-xs text-defaultText`}>in OH!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`h-auto m-2 flex flex-col rounded-lg bg-black`}>
                  <UsdcInput
                    value={toBeDeposited}
                    maxValue={usdcBalance}
                    onChange={setToBeDeposited}
                    onValidate={(isValid) => setDepositValid(isValid)}
                    disabled={!walletConnected || usdcBalance <= 0}
                  />
                </div>
                <div className={`h-auto m-2 flex flex-col`}>
                  <button
                    className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                    onClick={onClickDeposit}
                    disabled={
                      !walletConnected || !depositValid || usdcBalance <= 0 || toBeDeposited <= 0
                    }
                  >
                    Deposit
                  </button>
                </div>
              </div>
              <div
                className={`${styles['account-action-container']} h-64 flex flex-row rounded-lg bg-consoleBGInner border-2 border-consoleBorderInner`}
              >
                <div className={`w-full h-auto flex flex-col rounded-lg`}>
                  <div className={`h-full m-2 flex flex-col rounded-lg bg-black`}>
                    <div
                      className={`w-full h-full flex flex-col rounded-lg border-2 border-consoleBorderAccent bg-consoleAccent`}
                    >
                      <div className={`w-full h-full flex flex-row`}>
                        <div className={`w-full flex flex-row`}>
                          <div className="flex flex-col">
                            <img
                              className="ml-1 mt-2"
                              width={72}
                              height={72}
                              alt="OH! Token Logo"
                              src="/img/oh_usdc_token.png"
                            />
                          </div>
                          <div className="ml-1 flex flex-col">
                            <p className={`${h3} mt-4 w-full h-8`}>Withdraw USDC</p>
                            {walletConnected && (
                              <p className={`${textCashMd}`}>
                                ${isLoadingUsdc ? ' ---' : limitDecimals(usdcBalance)} Available
                              </p>
                            )}
                            {!walletConnected && <p className={`${textCashMd}`}>No lock-ups</p>}
                          </div>
                          <div className="pt-2 mt-8 w-9">
                            <HintButton hint={withdrawUsdcHint} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`h-auto m-2 flex flex-col rounded-lg bg-black`}>
                    <UsdcInput
                      value={toBeWithdrawn}
                      maxValue={usdcBalance}
                      onChange={setToBeWithdrawn}
                      onValidate={(isValid) => setWithdrawValid(isValid)}
                      disabled={!walletConnected || usdcBalance <= 0}
                    />
                  </div>
                  <div className={`h-auto m-2 flex flex-col`}>
                    <button
                      className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                      onClick={onClickWithraw}
                      disabled={
                        !walletConnected || !withdrawValid || usdcBalance <= 0 || toBeWithdrawn <= 0
                      }
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={chartContainerRef}
              className={`${styles['portfolio-container']} h-full container flex flex-col justify-between rounded-lg h-full`}
            >
              {!walletConnected && (
                <CaptureResize captureRef={chartContainerRef}>
                  {({ width, height }) => (
                    <div
                      className={`flex flex-col absolute bg-gradient-to-b from-consoleOverlayT to-consoleOverlayB z-10 items-center justify-center`}
                      style={{ width, height }}
                    >
                      <img
                        src={'/img/OhFinanceAssets_IconWallet.png'}
                        width={52}
                        height={49}
                        alt="Conect wallet icon"
                        className="w-[52px] h-[49px]"
                      />
                      <button
                        className="mt-6 py-2 px-24 rounded-lg bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight"
                        onClick={toggleConnectWalletDialog}
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                </CaptureResize>
              )}
              <div
                className={`flex ${styles['total-portfolio']} rounded-t-lg border-2 border-b-0 border-consoleBorderInner bg-inputBG`}
              >
                <div
                  className={`${styles['total-balance']} mt-12 ml-12 w-50 h-full justify-between`}
                >
                  <h1 className={`${h1}`}>Total Portfolio Balance</h1>
                  <p className={`mt-2 ${textCashLg}`}>${limitDecimals(portfolioBalance)}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${limitDecimals(portfolioBalance)} OUSDC (Deposited USDC)`}
                  </p>
                </div>
                <div
                  className={`${styles['total-interest']} mt-12 ml-12 w-50 h-full justify-between`}
                >
                  <h1 className={`${h1}`}>Total Interest Earned</h1>
                  <p className={`mt-2 ${textCashLg}`}>${limitDecimals(interestEarned)}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${limitDecimals(portfolioBalance)} OUSDC (Deposited USDC)`}
                  </p>
                </div>
              </div>
              <div
                ref={chartRef}
                className={`${styles['chart-container']} flex flex-col justify-between rounded-b-lg border-2 border-t-0 border-consoleBorderInner bg-consoleBGInner`}
              >
                <CaptureResize captureRef={chartRef}>
                  {({ width, height }) => {
                    return (
                      <div className="flex w-full h-full rounded-lg">
                        <Chart
                          data={data}
                          isLoading={isLoadingChart}
                          width={Math.min(width, 906)}
                          height={height}
                          onChartTimeChanged={(timeRange: ChartTimeRange) =>
                            setChartTimeRange(timeRange)
                          }
                        />
                      </div>
                    );
                  }}
                </CaptureResize>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles['main-container']} ${styles['stats-claim']} mt-4 mx-auto flex justify-between shadow-lg rounded-lg h-auto items-center`}
      >
        <div
          className={`${styles['stats-claim-bg']} flex flex-col justify-between shadow-lg rounded-lg bg-consoleBGOuter h-auto items-center`}
        >
          <div className={`flex-col w-auto`}>
            <div className={`flex flex-row justify-between`}>
              <div
                className={`h-24 container flex flex-row justify-between rounded-lg border-2 border-consoleBorderAccent bg-consoleAccent`}
                style={{ width: '300px' }}
              >
                <div className="flex flex-col">
                  <img
                    className="ml-1 mt-2"
                    width={81}
                    height={79}
                    alt="OH! Token Logo"
                    src="/img/oh_token_logo.png"
                  />
                </div>
                <div className="flex flex-col">
                  <button
                    className={`mt-3 mb-1 w-36 h-12 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                    onClick={onClickClaimOh}
                    disabled={!walletConnected || !availableOh}
                  >
                    Claim OH!
                  </button>
                  {walletConnected && (
                    <p className="text-accentText">${limitDecimals(availableOh)} Available</p>
                  )}
                  {!walletConnected && <p className="text-accentText">Coming Soon</p>}
                </div>
                <div className="mr-2 mt-8 flex flex-col">
                  <HintButton hint={claimOhHint} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles['stats-oh-bg']} w-full flex ${styles['stats-claim']} justify-between shadow-lg rounded-lg bg-consoleBGOuter h-auto items-center`}
        >
          <div className={`flex-col w-full`}>
            <div className={`w-full flex ${styles['stats-oh']} justify-between`}>
              <div
                className={`container flex ${styles['stats-oh']} justify-between rounded-lg border-2 border-consoleBorderInner bg-consoleBGInner`}
              >
                <div className={`mt-3 ml-4 w-5/6 flex flex-col`}>
                  <h2 className={`${h2}`}>Oh! Token Price</h2>
                  <div className="mt-2 w-11/12 border-2 border-solid border-selectionHighlight pl-2">
                    <p className={`${textCashMd}`}>
                      ${isLoadingPrice ? ' ---' : limitDecimals(price)}
                    </p>
                  </div>
                </div>
                <div className={`mt-3 ml-6 w-2/3 h-full flex flex-col`}>
                  <h2 className={`${h3}`}>Circulating Supply</h2>
                  <p className={`mt-2 ${textCashMd}`}>
                    ${isLoadingSupply ? ' ---' : formatCurrency(supply, 0)}
                  </p>
                </div>
                <div className={`mt-3 ml-6 w-2/3 h-full flex flex-col`}>
                  <h2 className={`${h3}`}>Market Cap</h2>
                  <p className={`mt-2 ${textCashMd}`}>
                    ${isLoadingMarketCap ? ' ---' : formatCurrency(marketCap, 0)}
                  </p>
                </div>
              </div>
              <div className={`ml-6 mt-3`}>
                <div className="w-64 min-w-32">
                  <h2 className={`${h2}`}>Total Value Locked</h2>
                  <p className={`mt-2 ${textCash}`}>
                    ${isLoadingTVL ? ' ---' : formatCurrency(tvl, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConnectWalletDialog && <ConnectWalletDialog />}
      <MarketingBody />
    </main>
  );
}) as NextPage;

export default Home;
