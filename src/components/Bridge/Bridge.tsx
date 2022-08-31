import { Token } from '@uniswap/sdk-core';
import BridgeTokenModal from 'components/_modals/bridgeModals/bridgeTokenModal';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { useState } from 'react';
import styled from 'styled-components';
import ToFromBox from '../../components/Bridge/ToFromBox';
import BridgeNetworkModal from '../../components/_modals/bridgeModals/bridgeNetworkModal';

const PageContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minWidth: '800px',
  minHeight: '500px',
});

const ToFromContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const BridgeTokenContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: theme.bg2,
  flexDirection: 'row',
  alignItems: 'center',
  width: '90%',
  height: '100px',
  borderRadius: '20px',
  marginTop: '20px',
}));

const BridgeToken = styled.div({
  height: '80%',
  aspectRatio: '1/1',
});
const BridgeTokenText = styled.div({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100px',
  fontSize: '12px',
  textAlign: 'center',
});

const BridgeTokenButton = styled.div({
  border: '2px solid grey',
  padding: '5px',
  margin: '5px',
  borderRadius: '20px',
  textAlign: 'center',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: 'grey',
  },
});

const BridgeAmount = styled.input(({ theme }) => ({
  borderRadius: '20px',
  height: '50%',
  backgroundColor: theme.bg4,
  color: 'white',
  '&:-webkit-outer-spin-button': {
    opacity: '1',
  },
}));

export default function Bridge() {
  const [bridgeFromModalOpen, setBridgeFromModalOpen] = useState(false);
  const [bridgeToModalOpen, setBridgeToModalOpen] = useState(false);
  const [fromNetwork, setFromNetwork] = useState(SupportedChainId.ETHEREUM_MAINNET);
  const [toNetwork, setToNetwork] = useState(SupportedChainId.AVALANCHE);
  const [bridgeTokenModalOpen, setBridgeTokenModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{ [chainId: number]: Token }>();

  // note: placeholder image
  const tempImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/640px-NewTux.svg.png';

  const fromNetworkData = CHAIN_INFO[fromNetwork];
  const toNetworkData = CHAIN_INFO[toNetwork];

  return (
    <>
      <BridgeNetworkModal
        title="From Networks"
        isOpen={bridgeFromModalOpen}
        setModalOpen={setBridgeFromModalOpen}
        chooseNetwork={setFromNetwork}
      />
      <BridgeNetworkModal
        title="To Networks"
        isOpen={bridgeToModalOpen}
        setModalOpen={setBridgeToModalOpen}
        chooseNetwork={setToNetwork}
      />
      Bridge Page
      <ToFromContainer>
        <ToFromBox
          icon={tempImage}
          networkName={fromNetworkData.label}
          openModal={setBridgeFromModalOpen}
        >
          From
        </ToFromBox>
        <ToFromBox
          icon={tempImage}
          networkName={toNetworkData.label}
          openModal={setBridgeToModalOpen}
        >
          To
        </ToFromBox>
      </ToFromContainer>
      <BridgeTokenContainer>
        <BridgeTokenModal
          title={'Token'}
          isOpen={bridgeTokenModalOpen}
          fromChain={fromNetworkData.label}
          setModalOpen={setBridgeTokenModalOpen}
          chooseToken={setSelectedToken}
        />
        <BridgeToken
          onClick={() => {
            setBridgeTokenModalOpen(true);
          }}
        >
          <img src={tempImage} alt="tokenIcon" width="100%" height="100%" />
        </BridgeToken>
        <BridgeTokenText
          onClick={() => {
            setBridgeTokenModalOpen(true);
          }}
        >
          <p>Token to Bridge</p>
          {selectedToken == undefined ? (
            <BridgeTokenButton>Select a token</BridgeTokenButton>
          ) : (
            <BridgeTokenButton>
              {selectedToken[fromNetwork]?.symbol ? selectedToken[fromNetwork]?.symbol : 'N/A'}
            </BridgeTokenButton>
          )}
        </BridgeTokenText>
        <BridgeAmount type="number" />
      </BridgeTokenContainer>
    </>
  );
}
