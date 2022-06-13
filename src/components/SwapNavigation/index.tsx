import styled from 'styled-components';
import NavItem from './NavItem';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  & :not(:last-child) {
    margin-right: 4px;
  }
`;

export default function SwapNavigation() {
  return (
    <Wrapper>
      <NavItem label="Swap" active />
      <NavItem label="Pool" />
      <NavItem label="OH! Boost" />
    </Wrapper>
  );
}
