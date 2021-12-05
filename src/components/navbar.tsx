import Link from 'next/link';
import React, { useState } from 'react';
import { CHAIN_INFO, SupportedChainId } from '~/constants/chains';
import { useActiveWeb3React } from '~/hooks/web3';
import { useThemeStore } from '~/stores/useThemeStore';
import { Network, useWalletStore } from '~/stores/useWalletStore';
import { switchToNetwork } from '~/utilities/switchToNetwork';
import { HintButton } from './hintButton';
import { WalletDisplay } from './walletDisplay';

const selectNetworkHint = 'Select which network you want to connect to.';

export function Navbar() {
  const { chainId, library } = useActiveWeb3React();
  const info = chainId ? CHAIN_INFO[chainId] : undefined;

  const { theme, setTheme } = useThemeStore();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [selectNetworkOpen, setSelectNetworkOpen] = useState(false);
  const { selectedNetwork, setSelectedNetwork, toggleConnectWalletDialog } = useWalletStore();

  let networkLabel;
  switch (selectedNetwork) {
    case Network.Ethereum:
      networkLabel = 'Ethereum';
      break;
    case Network.Avalanche:
      networkLabel = 'Avalanche';
      break;
    case Network.OH:
      networkLabel = 'OH!';
      break;
    default:
      networkLabel = 'UNKNOWN';
      break;
  }
  if (!chainId || !info || !library) {
    return null;
  }

  function NetworkRow({ targetChain }: { targetChain: number }) {
    if (!library || !chainId) {
      return null;
    }
    const handleRowClick = () => {
      switchToNetwork({ library, chainId: targetChain });
      toggleConnectWalletDialog();
    };
    const rowText = `${CHAIN_INFO[targetChain].label}`;

    return (
      <li>
        <button
          className="rounded-t bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
          // TODO: Oh! Finance will fill in network selection logic here
          onClick={handleRowClick}
        >
          {rowText}
        </button>
      </li>
    );
  }
  return (
    <header className="h-24 sm:h-32 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a>
            <img src={`img/oh_logo_${theme}.png`} width={98} height={60} alt="OH! Logo" />
          </a>
        </Link>
        <div className="flex items-center">
          <nav className="font-sen text-defaultText uppercase text-lg lg:flex items-center hidden">
            <Link href="https://docs.oh.finance/general/faq">
              <a className="py-2 px-6 flex hover:text-accentText hover:border-b-2 hover:border-selectionHighlight">
                FAQ
              </a>
            </Link>
            <Link href="https://docs.oh.finance/">
              <a className="py-2 px-6 flex hover:text-accentText hover:border-b-2 hover:border-selectionHighlight">
                Docs
              </a>
            </Link>
            <div className="flex">
              <img
                width={32}
                height={26}
                className="mr-2"
                alt="DARK THEME"
                src={`/img/darkMode_${theme}.png`}
              />
              <div className="relative inline-block w-10 mr-2 mt-1 align-middle select-none">
                <label
                  htmlFor="blue"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <input
                    id="blue"
                    name="toggle"
                    type="checkbox"
                    checked={theme === 'light'}
                    className="outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full checked:bg-white bg-selectionHighlight border-0 appearance-none cursor-pointer"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    readOnly
                  />
                </label>
              </div>
              <img
                className="mr-2"
                alt="LIGHT THEME"
                src={`/img/lightMode_${theme}.png`}
                width={35}
                height={35}
              />
            </div>
            <div className="flex pr-4 pl-8">
              <div className="bg-navBarAccent flex-col rounded-l-md w-52">
                <div className="flex flex-grow justify-center items-center w-48">
                  <p className="text-sm text-accentText py-2 px-2 -lg normal-case text-center">
                    Network
                  </p>
                  <HintButton hint={selectNetworkHint} />
                </div>
              </div>
              <div className="w-full group">
                <button
                  className={`py-1 px-4 -lg bg-navBarBG w-40 rounded-r-md text-defaultText text-md hover:bg-navBarBGHover`}
                  id="network-button"
                >
                  {info.label}
                  <div
                    className={`object-bottom bg-selectionHighlight rounded-br-md h-2 -my-1 -mx-4 relative`}
                  ></div>
                </button>
                <ul className="dropdown-menu absolute hidden group-hover:block text-defaultText pt-1 z-10 w-40">
                  <NetworkRow targetChain={SupportedChainId.ETHEREUM_MAINNET} />
                  <NetworkRow targetChain={SupportedChainId.AVALANCHE} />
                </ul>
              </div>
            </div>
            <button
              className="ml-6 py-1 px-2 rounded-lg text-md mr-4 lg:w-64"
              onClick={toggleConnectWalletDialog}
            >
              <WalletDisplay />
            </button>
          </nav>
          <button
            className="lg:hidden flex flex-col ml-4"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="w-6 h-1 bg-navBarHamburger mb-1"></span>
            <span className="w-6 h-1 bg-navBarHamburger mb-1"></span>
            <span className="w-6 h-1 bg-navBarHamburger mb-1"></span>
          </button>
        </div>

        {
          // nav menu
          navbarOpen && (
            <div className="w-3/4 h-full z-20 fixed top-0 right-0 bg-navMenuBG filter drop-shadow-xl">
              <div className="flex justify-between">
                <button
                  className="flex flex-col ml-4 mt-4"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <span className="w-8 h-1 bg-navBarHamburger mb-1"></span>
                  <span className="w-8 h-1 bg-navBarHamburger mb-1"></span>
                  <span className="w-8 h-1 bg-navBarHamburger mb-1"></span>
                </button>

                <div className="flex h-7 mt-4">
                  <img
                    width={22}
                    height={22}
                    className="mr-2 mt-1"
                    alt="DARK THEME"
                    src={`/img/darkMode_${theme}.png`}
                  />
                  <div className="relative inline-block w-10 mr-2 mt-1 align-middle select-none">
                    <label
                      htmlFor="blue"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <input
                        id="blue"
                        name="toggle"
                        type="checkbox"
                        checked={theme === 'light'}
                        className="outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full checked:bg-white bg-selectionHighlight border-4 appearance-none cursor-pointer"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        readOnly
                      />
                    </label>
                  </div>
                  <img
                    className="mr-2 mt-1"
                    alt="LIGHT THEME"
                    src={`/img/lightMode_${theme}.png`}
                    width={22}
                    height={22}
                  />
                </div>
              </div>

              <button
                className="ml-4 mt-4 py-1 px-2 mr-4 w-11/12 rounded-lg border-2 border-transparent text-white text-md"
                onClick={toggleConnectWalletDialog}
              >
                <WalletDisplay />
              </button>

              <div className="flex pl-2 mt-4 w-9/10">
                <div className="bg-navBarAccent flex-col rounded-l-md w-1/2">
                  <div className="flex flex-grow justify-center items-center">
                    <p className="text-sm text-accentText py-2 px-2 -lg normal-case text-center">
                      Network
                    </p>
                    <HintButton hint={selectNetworkHint} />
                  </div>
                </div>
                <div className="w-1/2 group">
                  <button
                    className={`py-2 px-4 w-11/12 -lg bg-navBarBG border-b-4 border-t-0 border-l-0 border-r-0 border-selectionHighlight rounded-r-md text-defaultText text-md hover:bg-navBarBGHover`}
                    id="network-button"
                    onClick={() => setSelectNetworkOpen(!selectNetworkOpen)}
                  >
                    {networkLabel}
                  </button>
                  {selectNetworkOpen && (
                    <ul className="dropdown-menu absolute block text-defaultText pt-1 z-10 w-1/2 pr-4">
                      <li>
                        <button
                          className="rounded-t bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
                          // TODO: Oh! Finance will fill in network selection logic here
                          onClick={() => {
                            setSelectedNetwork(Network.Ethereum);
                            setSelectNetworkOpen(!selectNetworkOpen);
                          }}
                        >
                          Ethereum
                        </button>
                      </li>
                      <li>
                        <button
                          className="bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
                          // TODO: Oh! Finance will fill in network selection logic here
                          onClick={() => {
                            setSelectedNetwork(Network.Avalanche);
                            setSelectNetworkOpen(!selectNetworkOpen);
                          }}
                        >
                          Avalanche
                        </button>
                      </li>
                      <li>
                        <button
                          className="rounded-b bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
                          // TODO: Oh! Finance will fill in network selection logic here
                          onClick={() => {
                            setSelectedNetwork(Network.OH);
                            setSelectNetworkOpen(!selectNetworkOpen);
                          }}
                        >
                          OH!
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="text-right pr-5 text-defaultText">
                <Link href="https://docs.oh.finance/getting-started/faq">
                  <a className="w-4 py-6 pt-12 px-6 font-bold text-xl flex hover:text-accentText hover:border-b-2 hover:border-selectionHighlight">
                    FAQ
                  </a>
                </Link>
                <Link href="https://docs.oh.finance/">
                  <a className="w-4 py-6 px-6 font-bold text-xl flex hover:text-accentText hover:border-b-2 hover:border-selectionHighlight">
                    Docs
                  </a>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </header>
  );
}
