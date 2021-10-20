import React from 'react';
import { useWalletStore } from '~/stores/useWalletStore';

const selectNetworkHint = 'This is a hint for selecting your network.';
const connectWalletHint = 'This is a hint for connecting your wallet.';

function onClickMetaMask() {
  // TODO: Oh! Finance will fill in MetaMask connection logic here
  console.log('clicked MetaMask');
  useWalletStore.getState().connectWallet();
}

export function WalletDisplay() {
  const { walletAddress, walletConnected } = useWalletStore();

  return (
    <div>
      {!walletConnected && (
        <div
          className={`py-1 px-2 rounded-lg bg-button border-2 border-transparent text-white text-md hover:bg-buttonHighlight`}
        >
          <p>Connect Wallet</p>
        </div>
      )}

      {walletConnected && (
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
          <p className="overflow-ellipsis overflow-hidden">{walletAddress}</p>
        </div>
      )}
    </div>
  );
}
