import OhModal from 'components/_modals/common/OhModal';

import { CHAIN_INFO, SupportedChainId } from 'constants/chains';

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
      <p
        key={chainId}
        onClick={() => {
          props.chooseNetwork(chainId);
          props.setModalOpen(false);
        }}
      >
        {CHAIN_INFO[chainId].label}
      </p>
    );
  });

  console.log('networks: ', networks);

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
