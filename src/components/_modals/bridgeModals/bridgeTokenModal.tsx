import { Token } from '@uniswap/sdk-core';
import OhModal from 'components/_modals/common/OhModal';
import { DAI, OH, tokenLogos, USDC, USDT } from 'constants/tokens';
import styled from 'styled-components';

const TokenItem = styled.div({
  margin: '10px',
  padding: '10px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#000F3D',
  },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const TokenIcon = styled.img({
  height: '1.5em',
  marginRight: '5px',
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
        <TokenIcon src={tokenLogos[OH[1].symbol]} />
        Oh
      </TokenItem>
      <TokenItem
        onClick={() => {
          props.chooseToken(USDC);
          props.setModalOpen(false);
        }}
      >
        <TokenIcon src={tokenLogos[USDC[1].symbol]} />
        USDC
      </TokenItem>
      <TokenItem
        onClick={() => {
          props.chooseToken(USDT);
          props.setModalOpen(false);
        }}
      >
        <TokenIcon src={tokenLogos[USDT[1].symbol]} />
        USDT
      </TokenItem>
      <TokenItem
        onClick={() => {
          props.chooseToken(DAI);
          props.setModalOpen(false);
        }}
      >
        <TokenIcon src={tokenLogos[DAI[1].symbol]} />
        DAI
      </TokenItem>
    </OhModal>
  );
}
