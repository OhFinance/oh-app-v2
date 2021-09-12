import React from 'react';
import { Network, useWalletStore } from '~/stores/useWalletStore';
import { HintButton } from './hintButton';

const selectNetworkHint = 'This is a hint for selecting your network.';
const connectWalletHint = 'This is a hint for connecting your wallet.';

function onClickMetaMask() {
  // TODO: Oh! Finance will fill in MetaMask connection logic here
  console.log('clicked MetaMask');
}

export function ConnectWalletDialog() {
  const { toggleConnectWalletDialog } = useWalletStore();
  const { setSelectedNetwork } = useWalletStore();
  const { selectedNetwork } = useWalletStore();

  return (
    <div
      // Parent Container
      className={`fixed inset-0 overflow-y-auto h-full w-full z-20`}
      id="connect-wallet-modal"
    >
      <div
        // Darkout Overlay
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        onClick={toggleConnectWalletDialog}
        onKeyDown={toggleConnectWalletDialog}
        role="button"
        tabIndex={0}
      ></div>
      <div
        // Close Button
        className={`fixed h-12 w-12 absolute top-0 right-0 items-center`}
      >
        <button
          className={`border-2 border-transparent text-accentText text`}
          onClick={toggleConnectWalletDialog}
        >
          <p className="text-7xl text-accentText -mx-3 border-2 border-transparent text-center">
            X
          </p>
        </button>
      </div>
      <div
        // Modal Content
        className="relative top-20 mx-auto p-5 w-10/12 shadow rounded-md bg-black"
      >
        <div className="flex flex-row p-2">
          <div className="bg-modalAccent flex-col w-1/4 rounded-l-md">
            <div className="flex justify-center items-center h-full">
              <p className="text-md text-accentText py-1 px-2 border-2 border-transparent text-center">
                1. Select Network
              </p>
              <HintButton hint={selectNetworkHint} />
            </div>
          </div>
          <div className="w-3/4">
            <button
              className={`py-1 px-2 border-2 border-transparent bg-modalBG text-white text-md hover:bg-modalBGHover w-1/3`}
              id="eth-wallet-button"
              // TODO: Oh! Finance will fill in network selection logic here
              onClick={() => setSelectedNetwork(Network.Ethereum)}
            >
              Ethereum
              <div
                className={`object-bottom bg-selectionHighlight h-2 -my-1 -mx-2 z-10 relative ${
                  selectedNetwork === Network.Ethereum ? '' : 'hidden'
                }`}
              ></div>
            </button>
            <button
              className={`py-1 px-2 border-2 border-transparent bg-modalBG text-white text-md hover:bg-modalBGHover w-1/3`}
              id="avalanche-wallet-button"
              // TODO: Oh! Finance will fill in network selection logic here
              onClick={() => setSelectedNetwork(Network.Avalanche)}
            >
              Avalanche
              <div
                className={`object-bottom bg-selectionHighlight h-2 -my-1 -mx-2 z-10 relative ${
                  selectedNetwork === Network.Avalanche ? '' : 'hidden'
                }`}
              ></div>
            </button>
            <button
              className={`py-1 px-2 border-2 border-transparent bg-modalBG text-white text-md hover:bg-modalBGHover w-1/3 rounded-r-md`}
              id="oh-wallet-button"
              // TODO: Oh! Finance will fill in network selection logic here
              onClick={() => setSelectedNetwork(Network.OH)}
            >
              OH!
              <div
                className={`object-bottom bg-selectionHighlight h-2 -my-1 -mx-2 z-10 relative ${
                  selectedNetwork === Network.OH ? '' : 'hidden'
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="flex flex-row p-2">
          <div className="bg-modalAccent flex-col w-1/4 rounded-l-md">
            <div className="flex justify-center items-center h-full">
              <p className="text-md text-accentText py-1 px-2  border-2 border-transparent text-center">
                2. Connect Wallet
              </p>
              <HintButton hint={connectWalletHint} />
            </div>
          </div>
          <div className="w-3/4 w-full bg-modalBG rounded-r-md">
            <div className="p-10">
              <button
                className={`border-2 border-transparent rounded-md p-5 text-white text-md bg-modalAccent hover:bg-modalAccentHover`}
                onClick={onClickMetaMask}
              >
                <img
                  width={72}
                  height={72}
                  alt="MetaMask Logo"
                  src="/img/OhFinanceAssets_metaMaskIcon.png"
                />
                MetaMask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
