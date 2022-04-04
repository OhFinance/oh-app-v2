import React from 'react';
import styled from 'styled-components';
import { Navbar } from './navbar';

const App = styled.div(({ theme }) => ({
  width: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const NavWrapper = styled.div(({ theme }) => ({
  ...theme.flexRowNoWrap,

  width: '100%',
}));

const Container = styled.div(({ theme }) => ({
  width: '80%',
  maxWidth: '1364px',
}));

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <App>
      <Container>
        <NavWrapper>
          <Navbar />
        </NavWrapper>
        {children}
      </Container>
    </App>
  );
}
