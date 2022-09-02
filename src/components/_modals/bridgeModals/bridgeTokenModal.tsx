import { Token } from '@uniswap/sdk-core';
import OhModal from 'components/_modals/common/OhModal';
import { DAI, OH, USDC, USDT } from 'constants/tokens';
import styled from 'styled-components';

const TokenItem = styled.div({
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
  fromChain: string;
  setModalOpen: (isOpen: boolean) => void;
  chooseToken: (tokenAddress: { [chainId: number]: Token }) => void;
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
      <TokenItem
        onClick={() => {
          props.chooseToken(OH);
          props.setModalOpen(false);
        }}
      >
        Oh
      </TokenItem>
      <TokenItem
        onClick={() => {
          props.chooseToken(USDC);
          props.setModalOpen(false);
        }}
      >
        USDC
      </TokenItem>
      <TokenItem
        onClick={() => {
          props.chooseToken(USDT);
          props.setModalOpen(false);
        }}
      >
        USDT
      </TokenItem>
      <TokenItem
        onClick={() => {
          props.chooseToken(DAI);
          props.setModalOpen(false);
        }}
      >
        DAI
      </TokenItem>
    </OhModal>
  );
}
