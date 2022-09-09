import { Token } from '@uniswap/sdk-core';
import ExternalLinkIcon from 'assets/img/external-link.svg';
import OhModal from 'components/_modals/common/OhModal';
import { SupportedChainId } from 'constants/chains';
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
  cursor: 'pointer',
});

const TokenIcon = styled.img({
  height: '1.5em',
  marginRight: '5px',
});
const Icon = styled.img({
  height: '1.5em',
  marginRight: '5px',
  marginLeft: 'auto',
});

interface Props {
  title: string;
  isOpen: boolean;
  fromChain: string;
  fromChainId: number;
  toChainId: number;
  setModalOpen: (isOpen: boolean) => void;
  chooseToken: (tokenAddress: { [chainId: number]: Token }) => void;
}

export default function BridgeTokenModal(props: Props) {
  let allTokens = [
    {
      name: 'Oh',
      logo: tokenLogos[OH[1].symbol],
      tokenInfo: OH,
    },
    {
      name: props.fromChainId === SupportedChainId.AVALANCHE ? 'USDC.e' : 'USDC',
      logo: tokenLogos[USDC[1].symbol],
      tokenInfo: USDC,
      '1to43114': 'https://bridge.avax.network/',
      '1to1088': 'https://bridge.metis.io/home',
    },
    {
      name: 'USDT',
      logo: tokenLogos[USDT[1].symbol],
      tokenInfo: USDT,
      '1to43114': 'https://bridge.avax.network/',
      '1to1088': 'https://bridge.metis.io/home',
    },
    {
      name: 'DAI',
      logo: tokenLogos[DAI[1].symbol],
      tokenInfo: DAI,
      '1to43114': 'https://bridge.avax.network/',
    },
  ];

  if (
    props.fromChainId === SupportedChainId.METIS ||
    props.toChainId === SupportedChainId.METIS ||
    props.fromChainId === SupportedChainId.MOONRIVER ||
    props.toChainId === SupportedChainId.MOONRIVER
  ) {
    allTokens.shift();
  }

  if (props.fromChainId === props.toChainId) {
    allTokens = [];
  }

  const handleTokenSelect = (token) => {
    if (token[`${props.fromChainId}to${props.toChainId}`]) {
      window.open(token[`${props.fromChainId}to${props.toChainId}`], '_blank');
    } else {
      props.chooseToken(token.tokenInfo);
      props.setModalOpen(false);
    }
  };

  return (
    <OhModal
      title={props.title}
      isOpen={props.isOpen}
      onDismiss={() => {
        props.setModalOpen(false);
      }}
    >
      {allTokens.map((token, i) => (
        <TokenItem key={i} onClick={() => handleTokenSelect(token)}>
          <TokenIcon src={token.logo} />
          {token.name}

          {token[`${props.fromChainId}to${props.toChainId}`] && (
            <Icon src={ExternalLinkIcon}></Icon>
          )}
        </TokenItem>
      ))}
    </OhModal>
  );
}
