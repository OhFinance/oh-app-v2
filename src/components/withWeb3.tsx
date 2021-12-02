import { useAddress } from 'hooks/useAddress';
import { useBankData } from 'hooks/useBankData';
import { useTokenBalance } from 'hooks/useTokenBalance';
import { useWeb3 } from 'hooks/useWeb3';
import React, { useMemo, useRef, useState } from 'react';
import { useBankAPYData } from 'state/banks/hooks';
import { Updaters } from 'Updaters';
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalances';
import { CaptureResize } from '~/components/captureResize';
import { Chart } from '~/components/chart';
import { HintButton } from '~/components/hintButton';
import { UsdcInput } from '~/components/usdcInput';
import { claimOhHint, depositUsdcHint, withdrawUsdcHint } from '~/constants/descriptionText';
import {
  h1,
  h2,
  h3,
  textCash,
  textCashLg,
  textCashMd,
  textPink,
} from '~/constants/tempTailwindConfig';
import styles from '~/pages/__styles__/index.module.css';
import { useChartStore } from '~/stores/useChartStore';
import { useCirculatingSupplyStore } from '~/stores/useCirculatingSupplyStore';
import { useMarketCapStore } from '~/stores/useMarketCapStore';
import { usePriceStore } from '~/stores/usePriceStore';
import { useTVLStore } from '~/stores/useTVLStore';
import { useUsdcStore } from '~/stores/useUsdcStore';
import { useWalletStore } from '~/stores/useWalletStore';
import { limitDecimals, limitDecimalsWithCommas } from '~/utilities/numberUtilities';

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

export const WithWeb3 = React.forwardRef(function WithWeb3() {
  // Stores
  const {
    portfolioBalance,
    interestEarned,
    availableOh,
    toBeDeposited,
    toBeWithdrawn,
    setToBeDeposited,
    setToBeWithdrawn,
  } = useWalletStore();
  const { isLoading: isLoadingUsdc, usdcBalance, bank } = useUsdcStore();
  const { isLoading: isLoadingPrice, price } = usePriceStore();
  const { isLoading: isLoadingMarketCap, marketCap } = useMarketCapStore();
  const { isLoading: isLoadingSupply, supply } = useCirculatingSupplyStore();
  const { isLoading: isLoadingChart, data, setTimeRange } = useChartStore();
  const { isLoading: isLoadingTVL, tvl: totalValueLocked } = useTVLStore();

  if (!bank) {
    throw new Error('Missing bank');
  }
  // Hooks
  const { chainId } = useWeb3();
  const address = useAddress(bank.address ?? {});
  const { balance, fetchStatus } = useTokenBalance(address);
  const { virtualBalance, virtualPrice, getShareValue } = useBankData(address);

  const apys = useBankAPYData(chainId ?? -1, (bank?.address as any)?.[chainId ?? -1] ?? '');

  const tvl = useMemo(() => {
    return (
      virtualBalance && limitDecimalsWithCommas(getBalanceNumber(virtualBalance, bank?.decimals))
    );
  }, [virtualBalance, bank]);

  const sharePrice = useMemo(() => {
    return virtualPrice && getFullDisplayBalance(virtualPrice, bank?.decimals);
  }, [virtualPrice, bank]);

  const balanceAmount = useMemo(() => {
    return balance && getFullDisplayBalance(balance, bank?.decimals);
  }, [balance, bank]);

  const shareValue = useMemo(() => {
    return balance && getShareValue(balance, bank?.decimals);
  }, [balance, bank, getShareValue]);

  const balanceValue = useMemo(() => {
    return shareValue && getFullDisplayBalance(shareValue, bank?.decimals);
  }, [shareValue, bank]);

  console.log('chainId', chainId);
  console.log('bank', bank);
  console.log('address', address);
  console.log('tvl', tvl);
  console.log('sharePrice', sharePrice);
  console.log('balanceAmount', balanceAmount);
  console.log('balance', balance);
  console.log('fetchStatus', fetchStatus);
  console.log('shareValue', shareValue);
  console.log('balanceValue', balanceValue);
  console.log('apys', apys);
  console.count('---------------');

  // State
  const [depositValid, setDepositValid] = useState(false);
  const [withdrawValid, setWithdrawValid] = useState(false);
  const chartRef = useRef(null as null | HTMLDivElement);
  const chartContainerRef = useRef(null as null | HTMLDivElement);

  return (
    <>
      <div
        className={`${styles['main-container']} mt-2 mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-consoleBGOuter h-auto items-center`}
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
                          <p className={`${textCashMd}`}>
                            ${isLoadingUsdc ? ' ---' : limitDecimals(usdcBalance)} Available
                          </p>
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
                    disabled={usdcBalance <= 0}
                  />
                </div>
                <div className={`h-auto m-2 flex flex-col`}>
                  <button
                    className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                    onClick={onClickDeposit}
                    disabled={!depositValid || usdcBalance <= 0 || toBeDeposited <= 0}
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
                            <p className={`${textCashMd}`}>
                              ${isLoadingUsdc ? ' ---' : limitDecimals(usdcBalance)} Available
                            </p>
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
                      disabled={usdcBalance <= 0}
                    />
                  </div>
                  <div className={`h-auto m-2 flex flex-col`}>
                    <button
                      className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                      onClick={onClickWithraw}
                      disabled={!withdrawValid || usdcBalance <= 0 || toBeWithdrawn <= 0}
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
              <div
                className={`flex ${styles['total-portfolio']} rounded-t-lg border-2 border-b-0 border-consoleBorderInner bg-inputBG`}
              >
                <div
                  className={`${styles['total-balance']} mt-12 ml-12 w-50 h-full justify-between`}
                >
                  <h1 className={`${h1}`}>Total Portfolio Balance</h1>
                  <p className={`mt-2 ${textCashLg}`}>${balanceAmount}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${balanceAmount} OH-USDC (Deposited USDC)`}
                  </p>
                </div>
                <div
                  className={`${styles['total-interest']} mt-12 ml-12 w-50 h-full justify-between`}
                >
                  <h1 className={`${h1}`}>Total Interest Earned</h1>
                  <p className={`mt-2 ${textCashLg}`}>${limitDecimals(interestEarned)}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${limitDecimals(portfolioBalance)} OH-USDC (Deposited USDC)`}
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
                          onChartTimeChanged={setTimeRange}
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
                    disabled={!availableOh}
                  >
                    Claim OH!
                  </button>
                  <p className="text-accentText">${limitDecimals(availableOh)} Available</p>
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
                    {isLoadingSupply ? ' ---' : limitDecimalsWithCommas(supply, 0)}
                  </p>
                </div>
                <div className={`mt-3 ml-6 w-2/3 h-full flex flex-col`}>
                  <h2 className={`${h3}`}>Market Cap</h2>
                  <p className={`mt-2 ${textCashMd}`}>
                    ${isLoadingMarketCap ? ' ---' : limitDecimalsWithCommas(marketCap, 0)}
                  </p>
                </div>
              </div>
              <div className={`ml-6 mt-3`}>
                <div className="w-64 min-w-32">
                  <h2 className={`${h2}`}>Total Value Locked</h2>
                  <p className={`mt-2 ${textCash}`}>${isLoadingTVL ? ' ---' : tvl}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Updaters />
    </>
  );
});
