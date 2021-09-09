import Link from 'next/link';
import React, { useState } from 'react';
import { useWalletStore } from '~/stores/useWalletStore';
import { HintButton } from './hintButton';

const selectNetworkHint = 'This is a hint for selecting your network.';

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { toggleConnectWalletDialog } = useWalletStore();
  const { setSelectedNetwork } = useWalletStore();
  const { selectedNetwork } = useWalletStore();

  // TODO: Figure out how to display hamburger menu when navbar is open
  return (
    <header className="dark:bg-gray-800 h-24 sm:h-32 flex items-center z-30 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a>
            <img src="img/oh_logo.png" width={98} height={60} alt="OH! Logo" />
          </a>
        </Link>
        <div className="flex items-center">
          <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
            <Link href="faq">
              <a className="py-2 px-6 flex hover:text-pink-500 hover:border-b-2 hover:border-pink-500">
                FAQ
              </a>
            </Link>
            <Link href="docs">
              <a className="py-2 px-6 flex hover:text-pink-500 hover:border-b-2 hover:border-pink-500">
                Docs
              </a>
            </Link>
            <div>
              <span className="mr-2">Dark</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <label
                  htmlFor="blue"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="toggle"
                    id="blue"
                    className="outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                </label>
              </div>
              <span>Light</span>
            </div>
            <div className="flex pr-4 pl-8">
              <div className="bg-modalPink flex-col rounded-l-md w-52">
                <div className="flex flex-grow justify-center items-center w-52">
                  <p className="text-sm text-pink-700 py-2 px-2 -lg text-center">
                    1. Select Network
                  </p>
                  <HintButton hint={selectNetworkHint} />
                </div>
              </div>
              <div className="w-full">
                <button
                  className={`py-1 px-4 -lg bg-gray-900 rounded-r-md text-white text-md hover:bg-gray-800`}
                  id="eth-wallet-button"
                  onClick={() => setSelectedNetwork(0)}
                >
                  Ethereum
                  <div
                    className={`object-bottom bg-pink-600 rounded-br-md h-2 -my-1 -mx-4 z-10 relative ${
                      selectedNetwork == 0 ? '' : 'hidden'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
            <button
              className="ml-6 py-1 px-2 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
              onClick={toggleConnectWalletDialog}
            >
              Connect Wallet
            </button>
          </nav>
          <button
            className="lg:hidden flex flex-col ml-4"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
