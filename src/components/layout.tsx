import React from 'react';
import styled from 'styled-components';
import { Navbar } from './_navigation/Navbar';

const App = styled.div(({ theme }) => ({
  width: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
}));

const NavWrapper = styled.div(({ theme }) => ({
  ...theme.flexRowNoWrap,

  width: '100%',
}));

const Container = styled.div(({ theme }) => ({
  width: '80%',
  maxWidth: '1364px',
  flexGrow: 1,
  paddingBottom: 60,
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
