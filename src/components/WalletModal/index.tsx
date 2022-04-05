import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import OhModal from 'components/_modals/common/OhModal';
import React from 'react';
import styled from 'styled-components';
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

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  padding-top: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

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
    <OhModal title="Connect Wallet" isOpen={walletModalOpen} onDismiss={toggleModal}>
      <OptionGrid>{getOptions()}</OptionGrid>
    </OhModal>
  );
}
