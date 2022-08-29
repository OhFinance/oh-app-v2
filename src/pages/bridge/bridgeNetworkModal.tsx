import OhModal from 'components/_modals/common/OhModal';

import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO, L1ChainInfo } from 'constants/chains';

interface Props {
  title: string;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  chooseNetwork: (ChainInfo: L1ChainInfo) => void;
}

const handleNetworkSelect = (network: string) => {};
export default function BridgeNetworkModal(props: Props) {
  const networks = ALL_SUPPORTED_CHAIN_IDS.map((chainId) => {
    return (
      <p
        key={chainId}
        onClick={() => {
          props.chooseNetwork(CHAIN_INFO[chainId]);
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
