import { BigintIsh, Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBankAPYData } from 'state/banks/hooks';
import { CaptureResize } from '~/components/captureResize';
import { Chart } from '~/components/chart';
import { HintButton } from '~/components/hintButton';
import { banks } from '~/constants/banks';
import { claimOhHint } from '~/constants/descriptionText';
import {
  h1,
  h2,
  h3,
  textCash,
  textCashLg,
  textCashMd,
  textPink,
} from '~/constants/tempTailwindConfig';
import { useVirtualBalance } from '~/hooks/calls/bank/useVirtualBalance';
import { useVirtualPrice } from '~/hooks/calls/bank/useVirtualPrice';
import { useBankContract } from '~/hooks/contracts/useBankContract';
import { ApprovalState, useApproveCallback } from '~/hooks/transactionCallbacks/useApproveCallback';
import { useActiveWeb3React } from '~/hooks/web3';
import styles from '~/pages/__styles__/index.module.css';
import { useDerivedStakeInfo, useStakeActionHandlers, useStakeState } from '~/state/stake/hooks';
import { Field } from '~/state/stake/reducer';
import { TransactionType } from '~/state/transactions/actions';
import { useTransactionAdder } from '~/state/transactions/hooks';
import { useTokenBalance } from '~/state/wallet/hooks';
import { useChartStore } from '~/stores/useChartStore';
import { useCirculatingSupplyStore } from '~/stores/useCirculatingSupplyStore';
import { useMarketCapStore } from '~/stores/useMarketCapStore';
import { usePriceStore } from '~/stores/usePriceStore';
import { useWalletStore } from '~/stores/useWalletStore';
import { calculateGasMargin } from '~/utilities/calculateGasMargin';
import { currencyId } from '~/utilities/currencyId';
import { limitDecimals, limitDecimalsWithCommas } from '~/utilities/numberUtilities';
import { CurrencyInput } from './CurrencyInput';
import StakeField from './StakeField';

function onClickClaimOh() {
  //TODO: Oh! Finance will fill in Claim Oh! logic here
  console.log('clicked Claim Oh!');
}

export const WithWeb3 = React.forwardRef(function WithWeb3() {
  const { account, chainId, library } = useActiveWeb3React();
  const {
    [Field.DEPOSIT]: { typedValue: depositTypedValue },
    [Field.WITHDRAW]: { typedValue: withdrawTypedValue },
  } = useStakeState();
  const { onUserInput } = useStakeActionHandlers();

  const handleTypeDeposit = useCallback(
    (value: string) => {
      onUserInput(Field.DEPOSIT, value);
    },
    [onUserInput]
  );
  const handleTypeWithdraw = useCallback(
    (value: string) => {
      onUserInput(Field.WITHDRAW, value);
    },
    [onUserInput]
  );

  // replace for selected bank
  const bank = banks[0];
  const token = useMemo(
    () => (chainId !== undefined ? bank.underlyingTokenMap[chainId] : undefined),
    [chainId, bank.underlyingTokenMap]
  );
  const bank_token = useMemo(
    () => (chainId !== undefined ? bank.ohTokenMap[chainId] : undefined),
    [chainId, bank.ohTokenMap]
  );

  const contract_address = useMemo(
    () => (chainId !== undefined ? bank.contractAddressMap[chainId] : undefined),
    [chainId, bank.contractAddressMap]
  );

  const { currencies, currencyBalances, inputError, parsedAmounts } = useDerivedStakeInfo();
  const isValidDeposit = !inputError || !inputError[Field.DEPOSIT];
  const isValidWithdraw = !inputError || !inputError[Field.WITHDRAW];

  const [approvalState, approveCallback] = useApproveCallback(
    parsedAmounts[Field.DEPOSIT],
    contract_address
  );

  console.log({ approvalState });

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);

  const showApproveFlow =
    !inputError?.[Field.DEPOSIT] &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED));

  // Stores
  const { portfolioBalance, availableOh, toBeWithdrawn } = useWalletStore();

  const underlyingTokenBalance = useTokenBalance(account || undefined, token);
  const bankTokenBalance = useTokenBalance(account || undefined, bank_token);

  const { isLoading: isLoadingPrice, price } = usePriceStore();
  const { isLoading: isLoadingMarketCap, marketCap } = useMarketCapStore();
  const { isLoading: isLoadingSupply, supply } = useCirculatingSupplyStore();
  const { isLoading: isLoadingChart, data, setTimeRange } = useChartStore();

  if (!bank) {
    throw new Error('Missing bank');
  }
  // Hooks
  const virtualBalance = useVirtualBalance(bank_token);
  const virtualPrice = useVirtualPrice(bank_token);

  const apys = useBankAPYData(chainId ?? -1, (bank_token?.address as any)?.[chainId ?? -1] ?? '');
  let valueOfShare: CurrencyAmount<Token> | undefined;
  if (bankTokenBalance && virtualPrice && bank_token) {
    valueOfShare = CurrencyAmount.fromRawAmount(
      bank_token,
      JSBI.multiply(bankTokenBalance.quotient, virtualPrice.quotient) as BigintIsh
    );
  }

  console.log('chainId', chainId);
  console.log('bank', bank);
  console.log('underlyingTokenBalance', underlyingTokenBalance);
  console.log('bankTokenBalance', bankTokenBalance);
  console.log('virtualPrice', virtualPrice);
  console.log('virtualBalance', virtualBalance);
  console.log('apys', apys);
  console.count('---------------');

  // State
  const chartRef = useRef(null as null | HTMLDivElement);
  const chartContainerRef = useRef(null as null | HTMLDivElement);

  const handleMax = useCallback(
    (field: Field) => {
      const balance = currencyBalances[field];
      balance && onUserInput(field, balance.toExact());
    },
    [currencyBalances, onUserInput]
  );

  const bankContract = useBankContract(contract_address);
  const addTransaction = useTransactionAdder();

  const onAddOrWithdraw = useCallback(
    async (field: Field) => {
      let parsedAmount = parsedAmounts[field];
      let currency = currencies[field];

      if (!chainId || !library || !account || !bankContract || !parsedAmount || !currency) return;

      let estimate =
        field === Field.DEPOSIT
          ? bankContract.estimateGas.deposit
          : bankContract.estimateGas.withdraw;
      let method = field === Field.DEPOSIT ? bankContract.deposit : bankContract.withdraw;

      estimate(parsedAmount.quotient.toString())
        .then((estimatedGasLimit) =>
          method((parsedAmount as CurrencyAmount<Token>).quotient.toString(), {
            gasLimit: calculateGasMargin(estimatedGasLimit),
          }).then((response) => {
            // setAttemptingTx(false)
            addTransaction(response, {
              type: TransactionType.DEPOSIT,
              currencyId: currencyId(currency as Currency),
              amountRaw: (parsedAmount as CurrencyAmount<Token>).quotient.toString(),
            });
          })
        )
        .catch((error) => {
          if (error?.code !== 4001) {
            console.error(error);
          }
        });
    },
    [chainId, library, account, parsedAmounts, currencies, addTransaction, bankContract]
  );

  const onDeposit = useCallback(() => {
    onAddOrWithdraw(Field.DEPOSIT);
  }, [onAddOrWithdraw]);

  const onWithdraw = useCallback(() => {
    onAddOrWithdraw(Field.WITHDRAW);
  }, [onAddOrWithdraw]);
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
                  <StakeField
                    fieldType={Field.DEPOSIT}
                    imageUrl="/img/oh_usdc_token.png"
                    selectedBank={bank}
                  />
                </div>
                <div className={`h-auto m-2 flex flex-col rounded-lg bg-black`}>
                  <CurrencyInput
                    value={depositTypedValue}
                    showMaxButton
                    onMax={() => handleMax(Field.DEPOSIT)}
                    currency={currencies[Field.DEPOSIT]}
                    onUserInput={handleTypeDeposit}
                    id="deposit-currency-input"
                  />
                </div>
                <div className={`h-auto m-2 flex flex-col`}>
                  {showApproveFlow ? (
                    <button
                      className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                      onClick={approveCallback}
                      disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    >
                      Approve {currencies[Field.DEPOSIT]?.symbol}
                    </button>
                  ) : (
                    <button
                      className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                      onClick={onDeposit}
                      disabled={!isValidDeposit}
                    >
                      {inputError?.[Field.DEPOSIT] ? inputError[Field.DEPOSIT] : 'Deposit'}
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`${styles['account-action-container']} h-64 flex flex-row rounded-lg bg-consoleBGInner border-2 border-consoleBorderInner`}
              >
                <div className={`w-full h-auto flex flex-col rounded-lg`}>
                  <div className={`h-full m-2 flex flex-col rounded-lg bg-black`}>
                    <StakeField
                      fieldType={Field.WITHDRAW}
                      imageUrl="/img/oh_usdc_token.png"
                      selectedBank={bank}
                    />
                  </div>
                  <div className={`h-auto m-2 flex flex-col rounded-lg bg-black`}>
                    <CurrencyInput
                      value={withdrawTypedValue}
                      showMaxButton
                      onMax={() => handleMax(Field.WITHDRAW)}
                      currency={currencies[Field.WITHDRAW]}
                      onUserInput={handleTypeWithdraw}
                      id="withdraw-currency-input"
                    />
                  </div>
                  <div className={`h-auto m-2 flex flex-col`}>
                    <button
                      className={`mb-1 w-full h-9 rounded bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight disabled:opacity-50`}
                      onClick={onWithdraw}
                      disabled={!isValidWithdraw}
                    >
                      {inputError?.[Field.WITHDRAW] ? inputError[Field.WITHDRAW] : 'Withdraw'}
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
                  <p className={`mt-2 ${textCashLg}`}>
                    ${bankTokenBalance?.toFixed(2, { groupSeparator: ',' })}
                  </p>
                  <p className={`${textPink} mt-10`}>
                    $
                    {`${bankTokenBalance?.toFixed(2, {
                      groupSeparator: ',',
                    })} OH-USDC (Deposited USDC)`}
                  </p>
                </div>
                <div
                  className={`${styles['total-interest']} mt-12 ml-12 w-50 h-full justify-between`}
                >
                  <h1 className={`${h1}`}>Total Interest Earned</h1>
                  <p className={`mt-2 ${textCashLg}`}>${limitDecimals(portfolioBalance)}</p>
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
                  <p className={`mt-2 ${textCash}`}>
                    $
                    {virtualBalance === undefined
                      ? ' ---'
                      : virtualBalance.toFixed(0, { groupSeparator: ',' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
