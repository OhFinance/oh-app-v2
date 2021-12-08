import React, { useMemo } from 'react';
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
        ? selectedBank[fieldType === Field.DEPOSIT ? 'underlyingTokenMap' : 'ohTokenMap'][chainId]
        : undefined,
    [chainId, fieldType, selectedBank]
  );

  const balance = useTokenBalance(account || undefined, token);

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
              src="/img/oh_usdc_token.png"
            />
          </div>
          <div className="ml-1 flex flex-col">
            <p className={`${h3} mt-4 w-full h-8 whitespace-nowrap`}>
              {fieldType === Field.DEPOSIT ? 'Deposit USDC' : 'Withdraw USDC'}
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
              <div className="mt-2 w-full h-auto flex flex-col ">
                <p className={`text-center text-xl text-defaultText`}>10-21% APR</p>
                <p className={`text-center text-xs text-defaultText`}>in-kind</p>
              </div>
              <div className="mt-4 mb-2 w-full h-auto">
                <p className={`text-center text-xl text-defaultText`}>+ Bonus 10-21% APR</p>
                <p className={`text-center text-xs text-defaultText`}>in OH!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
