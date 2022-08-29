import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { useState } from 'react';
import styled from 'styled-components';
import BridgeNetworkModal from './bridgeNetworkModal';
import ToFromBox from './ToFromBox';

const PageContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minWidth: '800px',
  minHeight: '500px',
});

const BridgeBox = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.bg4,
  flexDirection: 'column',
  alignItems: 'center',
  width: '600px',
  height: '650px',
  borderRadius: '20px',
  margin: '20px',
}));

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
const BridgeAmount = styled.div({});
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
  width: '90%',
  border: '2px solid grey',
  display: 'flex',
  justifyContent: 'center',
  padding: '5px',
  borderRadius: '20px',
  textAlign: 'center',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: 'grey',
  },
});

export default function BridgePage() {
  const [bridgeFromModalOpen, setBridgeFromModalOpen] = useState(false);
  const [bridgeToModalOpen, setBridgeToModalOpen] = useState(false);
  const [fromNetwork, setFromNetwork] = useState(CHAIN_INFO[SupportedChainId.ETHEREUM_MAINNET]);
  const [toNetwork, setToNetwork] = useState(CHAIN_INFO[SupportedChainId.AVALANCHE]);

  const tempImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/640px-NewTux.svg.png';

  console.log('toNetwork: ', toNetwork);
  console.log('fromNetwork: ', fromNetwork);
  return (
    <PageContainer>
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
      <BridgeBox>
        Bridge Page
        <ToFromContainer>
          <ToFromBox
            icon={tempImage}
            networkName={fromNetwork.label}
            openModal={setBridgeFromModalOpen}
          >
            From
          </ToFromBox>
          <ToFromBox
            icon={tempImage}
            networkName={toNetwork.label}
            openModal={setBridgeToModalOpen}
          >
            To
          </ToFromBox>
        </ToFromContainer>
        <BridgeTokenContainer>
          <BridgeToken>
            {/* <img src={tempImage} alt="tokenIcon" width="50px" height="50px" /> */}
            <img src={tempImage} alt="tokenIcon" width="100%" height="100%" />
          </BridgeToken>
          <BridgeTokenText>
            <p>Token to Bridge</p>
            <BridgeTokenButton>Select a token</BridgeTokenButton>
          </BridgeTokenText>
          <BridgeAmount>
            <input type="text" width={'100%'} height={'80%'}></input>
          </BridgeAmount>
        </BridgeTokenContainer>
      </BridgeBox>
    </PageContainer>
  );
}
