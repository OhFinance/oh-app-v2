import Link from 'next/link';
import React, { useState } from 'react';
import { useTheme } from '~/hooks/useTheme';
import { Network, useWalletStore } from '~/stores/useWalletStore';
import { HintButton } from './hintButton';

const selectNetworkHint = 'This is a hint for selecting your network.';

export function Navbar() {
  const [theme, setTheme] = useTheme();
  const [navbarOpen, setNavbarOpen] = useState(false);
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

  // TODO: Figure out how to display hamburger menu when navbar is open
  return (
    <header className="h-24 sm:h-32 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a>
            <img src="img/oh_logo.png" width={98} height={60} alt="OH! Logo" />
          </a>
        </Link>
        <div className="flex items-center">
          <nav className="font-sen text-defaultText uppercase text-lg lg:flex items-center hidden">
            <Link href="/faq">
              <a className="py-2 px-6 flex hover:text-accentText hover:border-b-2 hover:border-selectionHighlight">
                FAQ
              </a>
            </Link>
            <Link href="/docs">
              <a className="py-2 px-6 flex hover:text-accentText hover:border-b-2 hover:border-selectionHighlight">
                Docs
              </a>
            </Link>
            <div className="flex">
              <img
                width={32}
                height={26}
                className="mr-2"
                alt="DARK ON"
                src="/img/darkModeOn.png"
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
                    className="outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    readOnly
                  />
                </label>
              </div>
              <img className="mr-2" alt="LIGHT OFF" src="/img/lightModeOff.png" />
            </div>
            <div className="flex pr-4 pl-8">
              <div className="bg-modalAccent flex-col rounded-l-md w-52">
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
                  {networkLabel}
                  <div
                    className={`object-bottom bg-selectionHighlight rounded-br-md h-2 -my-1 -mx-4 relative`}
                  ></div>
                </button>
                <ul className="dropdown-menu absolute hidden group-hover:block text-defaultText pt-1 z-10 w-40">
                  <li className="">
                    <button
                      className="rounded-t bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
                      // TODO: Oh! Finance will fill in network selection logic here
                      onClick={() => setSelectedNetwork(Network.Ethereum)}
                    >
                      Ethereum
                    </button>
                  </li>
                  <li className="">
                    <button
                      className="bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
                      // TODO: Oh! Finance will fill in network selection logic here
                      onClick={() => setSelectedNetwork(Network.Avalanche)}
                    >
                      Avalanche
                    </button>
                  </li>
                  <li className="">
                    <button
                      className="rounded-b bg-navBarBG hover:bg-navBarBGHover py-2 px-4 block whitespace-no-wrap w-full"
                      // TODO: Oh! Finance will fill in network selection logic here
                      onClick={() => setSelectedNetwork(Network.OH)}
                    >
                      OH!
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="ml-6 py-1 px-2 rounded-lg bg-button border-2 border-transparent text-defaultText text-md mr-4 hover:bg-buttonHighlight"
              onClick={toggleConnectWalletDialog}
            >
              Connect Wallet
            </button>
          </nav>
          <button
            className="lg:hidden flex flex-col ml-4"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="w-6 h-1 bg-navBarBG mb-1"></span>
            <span className="w-6 h-1 bg-navBarBG mb-1"></span>
            <span className="w-6 h-1 bg-navBarBG mb-1"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
