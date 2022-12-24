import { Flex } from 'rebass';
import styled from 'styled-components';

export const CenteredRow = styled(Flex)<{ gap?: number | string }>(({ gap = 0 }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap,
}));

export default CenteredRow;
