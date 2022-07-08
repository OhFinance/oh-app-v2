import UnstyledButton from 'components/UnstyledButton';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useRef } from 'react';
import { ArrowDownCircle } from 'react-feather';
import { useModalOpen, useToggleModal } from 'state/application/hooks';
import { ApplicationModal } from 'state/application/reducer';
import styled from 'styled-components';
import { ExternalLink, MEDIA_WIDTHS } from 'theme';
import { switchToNetwork } from 'utilities/switchToNetwork';

const NetworksContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: theme.blue,
  backgroundColor: theme.bg4,
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '20px',
  position: 'relative',
  paddingLeft: 26,
  marginRight: 12,
}));

const NetworksButton = styled(UnstyledButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.bg2,
  color: theme.white,
  padding: '7px 20px 6px 20px',
  borderRadius: 20,
  marginLeft: 26,
  fontWeight: 600,
  boxSizing: 'content-box',
  border: '2px solid transparent',
  transition: 'border 0.1s ease-in',
  fontSize: '1rem',
  '&:hover': {
    border: `2px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const NetworkLogo = styled.div(({ theme }) => ({
  backgroundColor: theme.bg2,
  width: 37,
  height: 37,
  borderRadius: 50,
  boxShadow: 'inset 3px 3px 6px #000000',
  padding: 5,
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
}));

const Network = styled.p({
  padding: '0px 30px 0px 14px',
  margin: 0,
  fontSize: 'inherit',
});

const ExpandIcon = styled.svg({
  position: 'relative',
  bottom: -2,
});

// Menu
const FlyoutMenu = styled.div`
  position: absolute;
  top: 54px;
  width: 272px;
  z-index: 99;
  padding-top: 10px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 40px;
  }
`;

const FlyoutMenuContents = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: inset 0px 0px 50px #001f71;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;
  box-sizing: border-box;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;
const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 400;
`;

const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg1 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  box-sizing: border-box;
  text-align: left;
  width: 100%;
`;
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.blue};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`;
const LinkOutCircle = styled(ArrowDownCircle)`
  transform: rotate(230deg);
  width: 16px;
  height: 16px;
`;
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;
const NetworkLabel = styled.div`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.white};
`;

const ActiveRowLinkList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  box-sizing: border-box;
  & > a {
    align-items: center;
    color: ${({ theme }) => theme.blue};
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
    padding: 8px 0 4px;
    text-decoration: none;
  }
  & > a:first-child {
    margin: 0;
    margin-top: 0px;
    padding-top: 10px;
  }
`;
const ActiveRowWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  width: 100%;
`;

const SelectorWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
  }
`;

const ExplorerLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.AVALANCHE:
      return <>Snowtrace</>;
    case SupportedChainId.METIS:
      return <>Andromeda Explorer</>;
    case SupportedChainId.MOONBEAM:
      return <>Moonscan</>;
    case SupportedChainId.MOONRIVER:
      return <>Moonscan</>;
    default:
      return <>Etherscan</>;
  }
};

function Row({
  targetChain,
  onSelectChain,
}: {
  targetChain: SupportedChainId;
  onSelectChain: (targetChain: number) => void;
}) {
  const { library, chainId } = useActiveWeb3React();
  if (!library || !chainId) {
    return null;
  }
  const active = chainId === targetChain;
  const { explorer, label, logoUrl } = CHAIN_INFO[targetChain];

  const rowContent = (
    <FlyoutRow onClick={() => onSelectChain(targetChain)} active={active}>
      <Logo src={logoUrl} />
      <NetworkLabel>{label}</NetworkLabel>
      {chainId === targetChain && <FlyoutRowActiveIndicator />}
    </FlyoutRow>
  );

  if (active) {
    return (
      <ActiveRowWrapper>
        {rowContent}
        <ActiveRowLinkList>
          {explorer ? (
            <ExternalLink href={explorer}>
              <ExplorerLabel chainId={chainId} /> <LinkOutCircle />
            </ExternalLink>
          ) : null}
        </ActiveRowLinkList>
      </ActiveRowWrapper>
    );
  }
  return rowContent;
}

export default function NetworkSelector() {
  const { chainId, library } = useActiveWeb3React();
  const node = useRef<HTMLDivElement>();
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR);
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR);

  const info = chainId ? CHAIN_INFO[chainId] : undefined;

  const handleChainSwitch = useCallback(
    (targetChain: number, skipToggle?: boolean) => {
      if (!library) return;
      switchToNetwork({ library, chainId: targetChain })
        .then(() => {
          if (!skipToggle) {
            toggle();
          }
          // history.replace({
          //   search: replaceURLParam(
          //     history.location.search,
          //     'chain',
          //     getChainNameFromId(targetChain)
          //   ),
          // });
        })
        .catch((error) => {
          console.error('Failed to switch networks', error);

          // we want app network <-> chainId param to be in sync, so if user changes the network by changing the URL
          // but the request fails, revert the URL back to current chainId
          // if (chainId) {
          //   history.replace({
          //     search: replaceURLParam(
          //       history.location.search,
          //       'chain',
          //       getChainNameFromId(chainId)
          //     ),
          //   });
          // }

          if (!skipToggle) {
            toggle();
          }

          // dispatch(
          //   addPopup({
          //     content: { failedSwitchNetwork: targetChain },
          //     key: `failed-network-switch`,
          //   })
          // );
        });
    },
    [library, toggle]
  );

  if (!info || !chainId || !library) {
    return null;
  }
  return (
    <SelectorWrapper>
      <NetworksContainer>
        <p>Network</p>
        <SelectorWrapper ref={node as any} onMouseEnter={toggle} onMouseLeave={toggle}>
          <NetworksButton>
            <NetworkLogo>
              <img src={info.logoUrl} alt={info.label} />
            </NetworkLogo>
            <Network>{info.label}</Network>
            <ExpandIcon
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 2L6 6L10 2" stroke="#009CE2" strokeWidth="3" strokeLinecap="round" />
            </ExpandIcon>
          </NetworksButton>
          {open && (
            <FlyoutMenu>
              <FlyoutMenuContents>
                <FlyoutHeader>Select a network</FlyoutHeader>
                <Row
                  onSelectChain={handleChainSwitch}
                  targetChain={SupportedChainId.ETHEREUM_MAINNET}
                />
                <Row onSelectChain={handleChainSwitch} targetChain={SupportedChainId.AVALANCHE} />
                <Row onSelectChain={handleChainSwitch} targetChain={SupportedChainId.MOONBEAM} />
                <Row onSelectChain={handleChainSwitch} targetChain={SupportedChainId.MOONRIVER} />
                <Row onSelectChain={handleChainSwitch} targetChain={SupportedChainId.METIS} />
              </FlyoutMenuContents>
            </FlyoutMenu>
          )}
        </SelectorWrapper>
      </NetworksContainer>
    </SelectorWrapper>
  );
}
