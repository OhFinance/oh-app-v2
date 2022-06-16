import styled from 'styled-components';
import { CHAIN_INFO } from '~/constants/chains';
import { useActiveWeb3React } from '~/hooks/web3';
import logo from '../../../assets/img/logo.svg';
import Web3Status from '../../Web3Status';
import NetworkSelector from '../NetworkSelector';

const HeaderFrame = styled.div({
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  top: 0,
  position: 'relative',
  padding: '1rem 0px',

  // TODO MEDIA QUERIES
});

const LogoSVG = styled.img({
  width: '100%',
  height: '100%',
});

const Logo = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'auto',
  '&:hover': {
    cursor: 'pointer',
  },
});

const HeaderContent = styled.div({
  justifySelf: 'flex-end',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const NavLink = styled.a(({ theme }) => ({
  color: theme.blue,
  fontSize: '0.875rem',
  outline: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '8px 12px',
  wordBreak: 'break-word',
  whiteSpace: 'nowrap',
}));

export function Navbar() {
  const { chainId, library } = useActiveWeb3React();
  const info = chainId ? CHAIN_INFO[chainId] : undefined;

  if (!chainId || !info || !library) {
    return null;
  }

  return (
    <HeaderFrame>
      <Logo href="/">
        <LogoSVG src={logo} />
      </Logo>
      <HeaderContent>
        <NavLink href="https://docs.oh.finance/">FAQ</NavLink>
        <NavLink href="https://docs.oh.finance/" target="_blank">
          Docs
        </NavLink>
        <NetworkSelector />

        <Web3Status />
      </HeaderContent>
    </HeaderFrame>
  );
}
