import OhModal from 'components/_modals/common/OhModal';

import { CHAIN_INFO, L1ChainInfo, SupportedChainId } from 'constants/chains';
import styled from 'styled-components';

const NetworkItems = styled.div({
  display: 'flex',
  alignItems: 'center',
  margin: '10px',
  padding: '10px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#000F3D',
  },
});

const NetworkIcon = styled.img({
  height: '1.5em',
  marginRight: '10px',
});

interface Props {
  title: string;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  // chooseNetwork: (ChainInfo: L1ChainInfo) => void;
  chooseNetwork: (ChainInfo: number) => void;
}
// ETH, METIS, AVAX, MOVR
const bridgeSupportedChains = [
  SupportedChainId.ETHEREUM_MAINNET,
  SupportedChainId.METIS,
  SupportedChainId.AVALANCHE,
  SupportedChainId.MOONRIVER,
];

export default function BridgeNetworkModal(props: Props) {
  const networks = bridgeSupportedChains.map((chainId) => {
    const networkData: L1ChainInfo = CHAIN_INFO[chainId];
    return (
      <NetworkItems
        key={chainId}
        onClick={() => {
          props.chooseNetwork(chainId);
          props.setModalOpen(false);
        }}
      >
        <NetworkIcon src={networkData.logoUrl} />
        {CHAIN_INFO[chainId].label}
      </NetworkItems>
    );
  });

  return (
    <OhModal
      title={props.title}
      isOpen={props.isOpen}
      onDismiss={() => {
        props.setModalOpen(false);
      }}
    >
      {networks}
    </OhModal>
  );
}
