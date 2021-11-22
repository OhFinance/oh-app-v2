import { connectors } from 'config/constants/connectors';
import { ConnectorNames } from 'config/constants/types';
import { CONNECTOR_STORAGE_KEY, WALLET_STORAGE_KEY } from 'config/constants/values';
import useAuth from 'hooks/useAuth';
import React, { useCallback } from 'react';
import { Network, useWalletStore } from '~/stores/useWalletStore';
import { HintButton } from './hintButton';

const selectNetworkHint = 'Select which network you want to connect to.';
const connectWalletHint = 'This is a hint for connecting your wallet.';

function onClickMetaMask() {
  // TODO: Oh! Finance will fill in MetaMask connection logic here
  console.log('clicked MetaMask');
  useWalletStore.getState().connectWallet();
}

export function ConnectWalletDialog() {
  const { toggleConnectWalletDialog } = useWalletStore();
  const { setSelectedNetwork } = useWalletStore();
  const { selectedNetwork } = useWalletStore();

  // WIP: Testing Metamask connector
  const { icon, title, connectorId } = connectors[0];

  const { login } = useAuth();

  const onLogin = useCallback(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Since iOS does not support Trust Wallet we fall back to WalletConnect
    if (title === 'Trust Wallet' && isIOS) {
      login(ConnectorNames.WalletConnect);
    } else {
      login(connectorId);
    }

    localStorage.setItem(WALLET_STORAGE_KEY, title);
    localStorage.setItem(CONNECTOR_STORAGE_KEY, connectorId);
  }, [connectorId, login, title]);

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
        className="relative top-20 mx-auto p-5 w-11/12 shadow rounded-md bg-black"
      >
        <div className="flex flex-row p-2  lg:h-16">
          <div className="bg-modalAccent flex-col w-1/4 rounded-l-md">
            <div className="flex justify-center items-center h-full">
              <p className="text-sm lg:text-md text-accentText py-1 px-2 text-center">
                1. Select Network
              </p>
              <HintButton hint={selectNetworkHint} />
            </div>
          </div>
          <div className="w-3/4 h-24 lg:h-full">
            <button
              className={`py-1 px-2 border-b-4 border-t-0 border-l-0 border-r-0 ${
                selectedNetwork === Network.Ethereum
                  ? 'border-selectionHighlight'
                  : 'border-transparent'
              } bg-modalBG h-full text-white text-sm lg:text-md hover:bg-modalBGHover w-1/3`}
              id="eth-wallet-button"
              // TODO: Oh! Finance will fill in network selection logic here
              onClick={() => setSelectedNetwork(Network.Ethereum)}
            >
              Ethereum
            </button>
            <button
              className={`py-1 px-2 border-b-4 border-t-0 border-l-0 border-r-0 ${
                selectedNetwork === Network.Avalanche
                  ? 'border-selectionHighlight'
                  : 'border-transparent'
              } bg-modalBG h-full text-white text-sm lg:text-md hover:bg-modalBGHover w-1/3`}
              id="avalanche-wallet-button"
              // TODO: Oh! Finance will fill in network selection logic here
              onClick={() => setSelectedNetwork(Network.Avalanche)}
            >
              Avalanche
            </button>
            <button
              className={`py-1 px-2 border-b-4 border-t-0 border-l-0 border-r-0 ${
                selectedNetwork === Network.OH ? 'border-selectionHighlight' : 'border-transparent'
              } bg-modalBG h-full text-white text-sm lg:text-md hover:bg-modalBGHover w-1/3 rounded-r-md`}
              id="oh-wallet-button"
              // TODO: Oh! Finance will fill in network selection logic here
              onClick={() => setSelectedNetwork(Network.OH)}
            >
              OH!
            </button>
          </div>
        </div>

        <div className="flex flex-row p-2">
          <div className="bg-modalAccent flex-col w-1/4 rounded-l-md">
            <div className="flex justify-center items-center h-full">
              <p className="text-sm lg:text-md text-accentText py-1 px-2  border-2 border-transparent text-center">
                2. Connect Wallet
              </p>
              <HintButton hint={connectWalletHint} />
            </div>
          </div>
          <div className="w-3/4 w-full bg-modalBG rounded-r-md">
            <div className="p-10">
              <button
                className={`border-2 border-transparent rounded-md p-5 m-4 text-white text-md bg-modalAccent hover:bg-modalAccentHover`}
                onClick={onLogin}
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
