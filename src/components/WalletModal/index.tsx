import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import React from 'react';
import { injected } from '~/connectors';
import { SUPPORTED_WALLETS } from '~/constants/wallet';
import {
  useAddAlertCallback,
  useModalOpen,
  useRemoveAlertCallback,
  useWalletModalToggle,
} from '~/state/application/hooks';
import { ApplicationModal } from '~/state/application/reducer';
import { isMobile } from '~/utilities/userAgent';
import Option from './Option';

export default function WalletModal() {
  const { connector, activate } = useWeb3React();

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleModal = useWalletModalToggle();
  const addAlert = useAddAlertCallback();
  const removeAlert = useRemoveAlertCallback();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });
    // log selected wallet

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount();
          toggleModal();
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
            removeAlert('connecting-wallet');
            toggleModal();

            // a little janky...can't use setError because the connector isn't set
          } else {
            addAlert(
              'connecting-wallet',
              {
                title: 'Connecting wallet',
                content: 'Error connecting wallet',
                severity: 'error',
              },
              5000
            );
          }
        });
  };

  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;

    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      if (isMobile) {
        //disable portis on mobile for now

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              label={option.name}
              icon={option.iconURL}
              id={`connect-${key}`}
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector);
              }}
              active={option.connector && option.connector === connector}
              key={key}
              // id={`connect-${key}`}
              // key={key}
              // active={option.connector && option.connector === connector}
              // color={option.color}
              // link={option.href}
              // header={option.name}
              // subheader={null}
              // icon={option.iconURL}
            />
          );
        }
        return null;
      }

      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option key={key} label={option.name} icon={option.iconURL} id={`connect-${key}`} />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClick={() => {
              option.connector === connector
                ? toggleModal()
                : !option.href && tryActivation(option.connector);
            }}
            label={option.name}
            icon={option.iconURL}
            id={`connect-${key}`}
            key={key}
            active={option.connector && option.connector === connector}
          />
        )
      );
    });
  }

  if (!walletModalOpen) {
    return null;
  }
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed backdrop-blur-sm inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={toggleModal}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-consoleBGOuter border-consoleBorderInner border-2 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="border-consoleBorderInner bg-consoleBGOuter px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-left sm:mt-0 ">
                <h3 className="text-xl font-medium text-defaultText" id="modal-title">
                  Connect a Wallet
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Connect to a supported wallet</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col m-4">{getOptions()}</div>
        </div>
      </div>
    </div>
  );
}
