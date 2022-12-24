import styled from 'styled-components';
import CenteredRow from './CenteredRow';

export const SpacedRow = styled(CenteredRow)(() => ({
  justifyContent: 'space-between',
}));

export default SpacedRow;
