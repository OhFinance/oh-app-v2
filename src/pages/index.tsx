import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { CaptureResize } from '~/components/captureResize';
import { Chart } from '~/components/chart';
import { ConnectWalletDialog } from '~/components/connectWalletDialog';
import { HintButton } from '~/components/hintButton';
import { MarketingBody } from '~/components/marketingBody';
import { UsdcInput } from '~/components/usdcInput';
import { ChartTimeRange, useChartStore } from '~/stores/useChartStore';
import { useWalletStore } from '~/stores/useWalletStore';
import styles from '~/pages/__styles__/index.module.css';
import {
  h1,
  h2,
  h3,
  textCash,
  textCashLg,
  textCashMd,
  textCashXs,
  textPink,
} from '~/tempTailwindConfig';

const depositUsdcHint = 'This is a description of depositing USDC tokens.';
const claimOhHint = 'This is a description of claiming Oh! Token rewards.';

function onClickDeposit() {
  //TODO: Oh! Finance will fill in Deposit logic here
  console.log('clicked Deposit');
}

function onClickWithraw() {
  //TODO: Oh! Finance will fill in Withdraw logic here
  console.log('clicked Withdraw');
}

function onClickClaimOh() {
  //TODO: Oh! Finance will fill in Claim Oh! logic here
  console.log('clicked Claim Oh!');
}

const Home: NextPage = React.forwardRef(function Home() {
  const {
    walletConnected,
    showConnectWalletDialog,
    toggleConnectWalletDialog,
    portfolioBalance,
    interestEarned,
    availableOh,
    availableUsdc,
  } = useWalletStore();
  const { isLoading, data, fetchData } = useChartStore();
  const [chartTimeRange, setChartTimeRange] = useState('all' as ChartTimeRange);
  const chartRef = useRef(null as null | HTMLDivElement);
  const chartContainerRef = useRef(null as null | HTMLDivElement);

  function chartTimeChanged(timeRange: ChartTimeRange) {
    setChartTimeRange(timeRange);
  }

  useEffect(() => {
    fetchData(chartTimeRange);
  }, [fetchData, chartTimeRange]);

  return (
    <main className={`relative overflow-hidden`}>
      <div className={`flex items-center h-auto`}>
        <div
          className={`container mx-auto px-6 flex flex-col justify-between items-center relative py-4`}
        >
          <div className={`flex flex-col`}>
            <h1
              className={`text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2`}
            >
              <span className={`${textPink}`}>Earn More</span> with your{' '}
              <span className={`${textPink}`}>DeFi</span> dollar
            </h1>
          </div>
          <p
            className={`pt-20 text-3xl max-w-3xl justify-center dark:text-white text-gray-800 text-center py-2`}
          >
            Start by earning up to <span className={`${textPink}`}>10-21%</span> APY on USDC
            <br className={styles['cta-line-break']}></br> + a bonus{' '}
            <span className={`${textPink}`}>10-30%*</span> OH! reward in just{' '}
            <span className={`${textPink}`}>two clicks!</span>
          </p>
          <div className={`mt-10 flex flex-col shadow-lg rounded-lg p-10 w-96 bg-black`}>
            <button
              className={`py-1 px-2 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400`}
              onClick={toggleConnectWalletDialog}
            >
              Connect Wallet to get started
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${styles['main-container']} mt-36 mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
      >
        <div className={`p-6 flex-col w-full h-full`}>
          <div className={`w-full h-full flex flex-row`}>
            <div className={`h-auto container flex flex-col justify-between h-auto`}>
              <div className={`h-auto flex flex-col rounded-lg bg-gray-800 bg-opacity-75`}>
                <div className={`h-full m-2 flex flex-col rounded-lg bg-black`}>
                  <div
                    className={`w-full h-full flex flex-col rounded-lg bg-pink-800 bg-opacity-25`}
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
                          <p className={`${textCashMd}`}>${availableUsdc} Available</p>
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
                          className={`ml-3 mr-3 mb-3 w-auto h-auto flex flex-col justify-between border-4 border-pink-600 rounded-lg`}
                        >
                          <div className="mt-2 w-full h-auto flex flex-col ">
                            <p className={`text-center text-xl text-white`}>10-21% APR</p>
                            <p className={`text-center text-xs text-white`}>in-kind</p>
                          </div>
                          <div className="mt-4 mb-2 w-full h-auto">
                            <p className={`text-center text-xl text-white`}>+ Bonus 10-21% APR</p>
                            <p className={`text-center text-xs text-white`}>in OH!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`h-auto m-2 flex flex-col rounded-lg bg-black`}>
                  <UsdcInput
                    maxValue={availableUsdc}
                    onChange={console.log}
                    disabled={!walletConnected}
                  />
                </div>
                <div className={`h-auto m-2 flex flex-col`}>
                  <button
                    className={`mb-1 w-full h-9 rounded bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400 disabled:bg-gray-700`}
                    onClick={onClickDeposit}
                    disabled={!walletConnected}
                  >
                    Deposit
                  </button>
                </div>
              </div>
              <div className={`h-64 flex flex-row rounded-lg bg-gray-800 bg-opacity-75`}>
                <div className={`w-full h-auto flex flex-col rounded-lg bg-gray-800 bg-opacity-75`}>
                  <div className={`h-full m-2 flex flex-col rounded-lg bg-black`}>
                    <div
                      className={`w-full h-full flex flex-col rounded-lg bg-pink-800 bg-opacity-25`}
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
                            <p className={`${h3} mt-4 w-full h-8`}>Withdraw USDC</p>
                            <p className={`${textCashMd}`}>${availableUsdc} Available</p>
                          </div>
                          <div className="pt-2 ml-7 mt-8 flex flex-col">
                            <HintButton hint={depositUsdcHint} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`h-auto m-2 flex flex-col rounded-lg bg-black`}>
                    <UsdcInput
                      maxValue={availableUsdc}
                      onChange={console.log}
                      disabled={!walletConnected}
                    />
                  </div>
                  <div className={`h-auto m-2 flex flex-col`}>
                    <button
                      className={`mb-1 w-full h-9 rounded bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400 disabled:bg-gray-700`}
                      onClick={onClickWithraw}
                      disabled={!walletConnected}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={chartContainerRef}
              className={`ml-6 h-full container flex flex-col justify-between rounded-lg h-full`}
            >
              {!walletConnected && (
                <CaptureResize captureRef={chartContainerRef}>
                  {({ width, height }) => (
                    <div
                      className={`flex flex-col absolute bg-black bg-opacity-70 z-10 items-center justify-center`}
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
                        className="mt-6 py-2 px-24 rounded-lg bg-button border-2 border-transparent text-defaultText text-md hover:bg-buttonHighlight"
                        onClick={toggleConnectWalletDialog}
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                </CaptureResize>
              )}
              <div className={`h-64 flex flex-row rounded-t-lg bg-pink-800 bg-opacity-20`}>
                <div className={`mt-12 ml-12 w-50 h-full justify-between`}>
                  <h1 className={`${h1}`}>Total Portfolio Balance</h1>
                  <p className={`mt-2 ${textCashLg}`}>${portfolioBalance}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${portfolioBalance} OUSDC (Deposited USDC)`}
                  </p>
                </div>
                <div className={`ml-32 mt-12 w-50 h-full flex flex-col`}>
                  <h1 className={`${h1}`}>Total Interest Earned</h1>
                  <p className={`mt-2 ${textCashLg}`}>${interestEarned}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${portfolioBalance} OUSDC (Deposited USDC)`}
                  </p>
                </div>
              </div>
              <div
                ref={chartRef}
                className={`${styles['chart-container']} flex flex-col justify-between rounded-b-lg bg-gray-800 bg-opacity-80`}
              >
                <CaptureResize captureRef={chartRef}>
                  {({ width, height }) => {
                    return (
                      <div className="flex w-full h-full rounded-lg">
                        <Chart
                          data={data}
                          isLoading={isLoading}
                          width={Math.max(width, 906)}
                          height={height}
                          onChartTimeChanged={chartTimeChanged}
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
        className={`${styles['main-container']} mt-4 mx-auto flex flex-row justify-between shadow-lg rounded-lg h-auto items-center`}
      >
        <div
          className={`p-3 w-1/4 flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
        >
          <div className={`flex-col w-auto`}>
            <div className={`flex flex-row justify-between`}>
              <div
                className={`h-24 container flex flex-row justify-between rounded-lg bg-pink-800 bg-opacity-20`}
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
                    className={`mt-3 mb-1 w-36 h-12 rounded bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400 disabled:bg-gray-700`}
                    onClick={onClickClaimOh}
                    disabled={!walletConnected}
                  >
                    Claim OH!
                  </button>
                  <p className="text-white">${availableOh} Available</p>
                </div>
                <div className="mr-2 mt-8 flex flex-col">
                  <HintButton hint={claimOhHint} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`ml-3 p-3 w-full flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
        >
          <div className={`flex-col w-full`}>
            <div className={`w-full flex flex-row justify-between`}>
              <div
                className={`h-24 container flex flex-row justify-between rounded-lg bg-gray-800 opacity-75`}
              >
                <div className={`mt-3 ml-4 w-5/6 flex flex-col`}>
                  <h2 className={`${h2}`}>
                    Oh! Token Stats <span className={textCashXs}>/ 24hr</span>
                  </h2>
                  <div className="mt-2 w-11/12 border-2 border-solid border-pink-500">
                    <p className={`${textCashMd}`}>${interestEarned}</p>
                  </div>
                </div>
                <div className={`mt-3 ml-6 w-2/3 h-full flex flex-col`}>
                  <h2 className={`${h3}`}>Circulating Supply</h2>
                  <p className={`mt-2 ${textCashMd}`}>${interestEarned}</p>
                </div>
                <div className={`mt-3 ml-6 w-2/3 h-full flex flex-col`}>
                  <h2 className={`${h3}`}>Market Cap</h2>
                  <p className={`mt-2 ${textCashMd}`}>${interestEarned}</p>
                </div>
              </div>
              <div className={`ml-6 mt-3`}>
                <div className="w-64 min-w-32">
                  <h2 className={`${h2}`}>Total Value Locked</h2>
                  <p className={`mt-2 ${textCash}`}>${interestEarned}</p>
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
