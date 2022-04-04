import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { Button, Flex } from 'rebass';
import styled from 'styled-components';
import { BorderedLogo } from 'theme';

const ConnectButton = styled(Button)({
  alignSelf: 'stretch',
});

const Web3StatusConnected = styled.div(({ theme }) => ({
  alignSelf: 'stretch',
  backgroundColor: theme.bg2,
  padding: '20px 7px',
  boxSizing: 'border-box',
  color: '#fff',
}));

function Web3StatusInner() {
  const { account, connector, error } = useWeb3React();

  if (account) {
    return (
      <Web3StatusConnected>
        <Flex alignItems={'center'}>
          <BorderedLogo></BorderedLogo>
        </Flex>
      </Web3StatusConnected>
    );
  } else {
  }
  return <></>;
}

export default function Web3Status() {
  return <ConnectButton>Connect Wallet</ConnectButton>;
}
