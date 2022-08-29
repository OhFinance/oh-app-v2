import OhModal from 'components/_modals/common/OhModal';

interface Props {
  title: string;
  isOpen: boolean;
  setModalOpen: (boolean) => void;
  chooseNetwork: (ChainInfo) => void;
}

export default function BridgeTokenModal(props: Props) {
  return (
    <OhModal
      title={props.title}
      isOpen={props.isOpen}
      onDismiss={() => {
        props.setModalOpen(false);
      }}
    >
      <p>test</p>
    </OhModal>
  );
}
