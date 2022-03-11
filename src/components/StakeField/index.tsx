import React, { useMemo } from 'react';
import { useBankAPYData } from 'state/banks/hooks';
import { Bank } from '~/constants/banks';
import { depositUsdcHint } from '~/constants/descriptionText';
import { h3, textCashMd } from '~/constants/tempTailwindConfig';
import { useActiveWeb3React } from '~/hooks/web3';
import { Field } from '~/state/stake/reducer';
import { useTokenBalance } from '~/state/wallet/hooks';
import { HintButton } from '../hintButton';

interface StakeFieldProps {
  imageUrl: string;
  fieldType: Field;
  // replace for redux state kept bank
  selectedBank: Bank;
}
export default function StakeField({ imageUrl, fieldType, selectedBank }: StakeFieldProps) {
  const { account, chainId } = useActiveWeb3React();
  const token = useMemo(
    () =>
      chainId !== undefined
        ? selectedBank[fieldType === Field.DEPOSIT ? 'underlyingToken' : 'ohToken']
        : undefined,
    [chainId, fieldType, selectedBank]
  );

  const balance = useTokenBalance(account || undefined, token);
  const apys = useBankAPYData(selectedBank.ohToken.chainId, selectedBank.ohToken.address);
  const apyString = useMemo(() => {
    if (apys && apys[0] && apys[2]) {
      return `${apys[0].apy?.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}% - ${apys[2].apy?.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}% APR`;
    }
    return 'loading...';
  }, [apys]);
  return (
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
              src={selectedBank.image}
              style={{ maxWidth: 'none' }}
            />
          </div>
          <div className="ml-1 flex flex-col">
            <p className={`${h3} mt-4 w-full whitespace-wrap`}>
              {fieldType === Field.DEPOSIT
                ? `Deposit ${selectedBank.underlyingToken.symbol}`
                : `Withdraw ${selectedBank.ohToken.symbol}`}
            </p>
            <p className={`${textCashMd} whitespace-normal`}>
              ${balance === undefined ? ' ---' : balance.toFixed(2, { groupSeparator: ',' })}{' '}
              Available
            </p>
          </div>
          <div className="ml-8 mt-8 flex">
            <HintButton hint={depositUsdcHint} />
          </div>
        </div>
      </div>
      {fieldType === Field.DEPOSIT && (
        <div className={`w-full h-full flex flex-col`}>
          <div className={`w-full h-full flex flex-col`}>
            <p className={`${h3} w-full mt-2 h-8 text-center`}>Earning Rate</p>
            <div
              className={`ml-3 mr-3 mb-3 w-auto h-auto flex flex-col justify-between border-4 border-selectionHighlight rounded-lg`}
            >
              <div className="my-2 w-full h-auto flex flex-col ">
                <p className={`text-center text-xl text-defaultText`}>{`${apyString}`}</p>
                <p className={`text-center text-xs text-defaultText`}>in-kind</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
