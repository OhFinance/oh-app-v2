import OhModal from 'components/_modals/common/OhModal';

import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import styled from 'styled-components';

const NetworkItems = styled.div({
  margin: '10px',
  padding: '10px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#000F3D',
  },
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
    return (
      <NetworkItems
        key={chainId}
        onClick={() => {
          props.chooseNetwork(chainId);
          props.setModalOpen(false);
        }}
      >
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
