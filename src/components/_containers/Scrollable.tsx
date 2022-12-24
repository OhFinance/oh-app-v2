import styled from 'styled-components';
import FullWidthColumn from './FullWidthColumn';

export const Scrollable = styled(FullWidthColumn)({
  overflow: 'auto',
  flexGrow: 1,
  justifyContent: 'start',
  '::-webkit-scrollbar': {
    width: 3,
  },
  '::-webkit-scrollbar-track': {
    background: '#000230',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#E7018C',
  },
});
