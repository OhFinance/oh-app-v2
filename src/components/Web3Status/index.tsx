import { useWeb3React } from '@web3-react/core';
import Identicon from 'components/Identicon';
import React from 'react';
import { Button, Flex } from 'rebass';
import styled from 'styled-components';
import { ThemedText } from 'theme';
import { shortenAddress } from 'utilities';

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

  if (account) {
    return (
      <Web3StatusConnected>
        <Flex alignItems={'center'} height="100%">
          <Identicon />
          <ThemedText.Main fontSize="20px" lineHeight="20px" paddingLeft="8px">
            {shortenAddress(account)}
          </ThemedText.Main>
        </Flex>
      </Web3StatusConnected>
    );
  } else {
    return <ConnectButton>Connect Wallet</ConnectButton>;
  }
}

export default function Web3Status() {
  return <Web3StatusInner />;
}
