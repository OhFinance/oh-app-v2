import styled from 'styled-components';

export const BorderedLogo = styled.div(({ theme }) => ({
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
