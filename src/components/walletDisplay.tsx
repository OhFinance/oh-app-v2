import React from 'react';
import { useActiveWeb3React } from '~/hooks/web3';

export function WalletDisplay() {
  const { account } = useActiveWeb3React();
  return (
    <div>
      {account ? (
        <div
          className={`py-1 px-2 rounded-lg bg-transparent border-2 border-selectionHighlight text-defaultText font-bold text-md flex`}
        >
          <img
            width={24}
            height={24}
            className="mr-2 filter drop-shadow-lg"
            src="/img/dot.png"
            alt="Wallet Icon"
          />
          <p className="overflow-ellipsis overflow-hidden">{account}</p>
        </div>
      ) : (
        <div
          className={`py-1 px-2 rounded-lg bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight`}
        >
          <p>Connect Wallet</p>
        </div>
      )}
    </div>
  );
}
