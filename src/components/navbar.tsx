import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO } from '~/constants/chains';
import { useActiveWeb3React } from '~/hooks/web3';
import { useWalletModalToggle } from '~/state/application/hooks';
import { useThemeStore } from '~/stores/useThemeStore';
import { switchToNetwork } from '~/utilities/switchToNetwork';
import Button from './Button';
import { HintButton } from './hintButton';
import UnstyledButton from './UnstyledButton';
import { WalletDisplay } from './walletDisplay';
import Web3Status from './Web3Status';
import NetworkSelector from './_navigation/NetworkSelector';

const selectNetworkHint = 'Select which network you want to connect to.';

const HeaderFrame = styled.div({
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  top: 0,
  position: 'relative',
  padding: '1rem 0px',

  // TODO MEDIA QUERIES
});

const Logo = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'auto',
  '&:hover': {
    cursor: 'pointer',
  },
});

const HeaderContent = styled.div({
  justifySelf: 'flex-end',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const NavLink = styled.a(({ theme }) => ({
  color: theme.blue,
  fontSize: '0.875rem',
  outline: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '8px 12px',
  wordBreak: 'break-word',
  whiteSpace: 'nowrap',
}));

const NetworksContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: theme.blue,
  backgroundColor: theme.bg4,
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '20px',
  position: 'relative',
  paddingLeft: 26,
  marginRight: 12,
}));

const NetworksButton = styled(UnstyledButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.bg2,
  color: theme.white,
  padding: '7px 20px 6px 20px',
  borderRadius: 20,
  marginLeft: 26,
  fontWeight: 600,
  boxSizing: 'content-box',
  border: '2px solid transparent',
  transition: 'border 0.1s ease-in',
  fontSize: '1rem',
  '&:hover': {
    border: `2px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const NetworkLogo = styled.div(({ theme }) => ({
  backgroundColor: theme.bg2,
  width: 37,
  height: 37,
  borderRadius: 50,
  boxShadow: 'inset 3px 3px 6px #000000',
  padding: 5,
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
}));

const Network = styled.p({
  padding: '0px 30px 0px 14px',
  margin: 0,
  fontSize: 'inherit',
});

const ExpandIcon = styled.svg({
  position: 'relative',
  bottom: -2,
});

const ConnectButton = styled(Button)({
  alignSelf: 'stretch',
});

export function Navbar() {
  const { chainId, library, account } = useActiveWeb3React();
  const info = chainId ? CHAIN_INFO[chainId] : undefined;

  const { theme, setTheme } = useThemeStore();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [selectNetworkOpen, setSelectNetworkOpen] = useState(false);

  const toggleWalletModal = useWalletModalToggle();

  if (!chainId || !info || !library) {
    return null;
  }

  function NetworkRow({ targetChain }: { targetChain: number }) {
    if (!library || !chainId) {
      return null;
    }
    const handleRowClick = () => {
      switchToNetwork({ library, chainId: targetChain });
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
  if (1) {
    return (
      <HeaderFrame>
        <Logo href=".">
          <svg
            width="263"
            height="40"
            viewBox="0 0 263 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3603 27.4717C15.2989 27.4717 14.2704 27.1037 13.45 26.4304C12.6296 25.7572 12.068 24.8203 11.8609 23.7793C11.6539 22.7384 11.8141 21.6579 12.3144 20.7219C12.8147 19.7859 13.6241 19.0523 14.6046 18.6461C15.5851 18.2399 16.6761 18.1863 17.6917 18.4944C18.7074 18.8025 19.5848 19.4531 20.1744 20.3356C20.7641 21.218 21.0295 22.2776 20.9255 23.3339C20.8215 24.3901 20.3545 25.3775 19.604 26.128C18.7437 26.9883 17.5769 27.4717 16.3603 27.4717ZM16.3603 6.52402C7.32455 6.52402 0 13.8486 0 22.8843C0 31.92 7.32455 39.2445 16.3603 39.2445C25.396 39.2445 32.7205 31.9195 32.7205 22.8843C32.7205 18.5453 30.9969 14.384 27.9287 11.3158C24.8606 8.24768 20.6993 6.52402 16.3603 6.52402Z"
              fill="#009CE2"
            />
            <path
              d="M54.2292 19.0965V7.75174H66.5679V38.1238H54.2292V26.7786H48.5345V38.1238H36.1953V7.75174H48.5345V19.0965H54.2292Z"
              fill="#009CE2"
            />
            <path
              d="M74.4688 25.5331L77.8106 0L86.1143 1.69439L79.1844 26.4955L74.4688 25.5331Z"
              fill="#009CE2"
            />
            <path
              d="M75.1164 38.6506C77.7374 38.6506 79.8621 36.5259 79.8621 33.9049C79.8621 31.2839 77.7374 29.1591 75.1164 29.1591C72.4954 29.1591 70.3706 31.2839 70.3706 33.9049C70.3706 36.5259 72.4954 38.6506 75.1164 38.6506Z"
              fill="#009CE2"
            />
            <path
              d="M169.489 18.0665L166.604 26.1941H172.343L169.552 18.0665H169.489Z"
              fill="#009CE2"
            />
            <path
              d="M90.7876 8.12952V38.7559H263V8.12952H90.7876ZM119.632 16.702H108.93V21.8202H118.205V25.6036H108.93V34.7554H104.059V12.6061H119.632V16.702ZM129.742 34.7549H124.874V12.6056H129.742V34.7549ZM154.525 34.7549H149.657L140.444 19.927H140.382V34.7559H135.822V12.6066H140.661L149.904 27.4661H149.967V12.6071H154.527L154.525 34.7549ZM175.291 34.7549L173.615 29.8231H165.333L163.596 34.7559H158.667L167.074 12.6066H172.068L180.349 34.7559L175.291 34.7549ZM203.175 34.7549H198.307L189.091 19.928H189.029V34.7559H184.469V12.6066H189.308L198.552 27.4656H198.615V12.6071H203.175L203.175 34.7549ZM219.147 35.2826C212.292 35.2826 208.259 30.1644 208.259 23.7737C208.259 17.1976 212.292 12.0789 219.147 12.0789C224.018 12.0789 228.112 14.933 228.702 20.0512H223.986C223.676 17.8489 221.567 16.1738 219.147 16.1738C214.773 16.1738 213.129 19.8959 213.129 23.7737C213.129 27.4656 214.774 31.1876 219.147 31.1876C222.125 31.1876 223.801 29.1402 224.173 26.2223H228.888C228.392 31.745 224.576 35.2811 219.147 35.2811V35.2826ZM250.723 34.7559H233.91V12.6066H250.477V16.702H238.781V21.4483H249.514V25.2326H238.781V30.6614H250.722L250.723 34.7559Z"
              fill="#009CE2"
            />
          </svg>
        </Logo>
        <HeaderContent>
          <NavLink>FAQ</NavLink>
          <NavLink>Docs</NavLink>
          <NetworkSelector />

          <Web3Status />
        </HeaderContent>
      </HeaderFrame>
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
            {account && (
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
                    {ALL_SUPPORTED_CHAIN_IDS.map((chainId, i) => (
                      <NetworkRow targetChain={chainId} key={`chain-${i}-${chainId}`} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <button
              className="ml-6 py-1 px-2 rounded-lg text-md mr-4 lg:w-64"
              onClick={toggleWalletModal}
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
                  onClick={() => setNavbarOpen((prev) => !prev)}
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
                onClick={() => {
                  setNavbarOpen(false);
                  toggleWalletModal();
                }}
              >
                <WalletDisplay />
              </button>
              {account && (
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
                      {info.label}
                    </button>
                    {selectNetworkOpen && (
                      <ul className="dropdown-menu absolute block text-defaultText pt-1 z-10 w-1/2 pr-4">
                        {ALL_SUPPORTED_CHAIN_IDS.map((chainId, i) => (
                          <NetworkRow targetChain={chainId} key={`chain-${i}-${chainId}`} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

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
