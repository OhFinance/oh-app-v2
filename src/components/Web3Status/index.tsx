import { useWeb3React } from '@web3-react/core';
import Button from 'components/Button';
import Identicon from 'components/Identicon';
import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { ThemedText } from 'theme';
import { shortenAddress } from 'utilities';
import { NetworkContextName } from '~/constants/misc';
import { useToggleModal } from '../../state/application/hooks';
import { ApplicationModal } from '../../state/application/reducer';
import WalletModal from '../WalletModal';

const ConnectButton = styled(Button)({
  alignSelf: 'stretch',
});

const Web3StatusConnected = styled.div(({ theme }) => ({
  alignSelf: 'stretch',
  backgroundColor: theme.bg2,
  padding: '0px 20px',

  borderRadius: 20,
  boxSizing: 'border-box',
  color: '#fff',
}));

function Web3StatusInner() {
  const { account, connector, error } = useWeb3React();
  const toggleModal = useToggleModal(ApplicationModal.WALLET);
  if (account) {
    return (
      <Web3StatusConnected>
        <Flex alignItems={'center'} height="100%">
          <Identicon />
          <ThemedText.Main fontSize="16px" lineHeight="16px" paddingLeft="8px">
            {shortenAddress(account)}
          </ThemedText.Main>
        </Flex>
      </Web3StatusConnected>
    );
  } else {
    return (
      <ConnectButton id="connect-wallet" onClick={toggleModal}>
        Connect Wallet
      </ConnectButton>
    );
  }
}

export default function Web3Status() {
  const { active } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && <WalletModal />}
    </>
  );
}
