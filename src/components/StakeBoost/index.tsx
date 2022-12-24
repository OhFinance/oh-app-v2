import Image from 'next/image';
import { actionTypeType } from 'pages/stake';
import styled from 'styled-components';
import Stake from '../../components/Stake';
import StakeAction from '../../components/StakeAction';
import StyledCloseButton from '../../components/StyledCloseButton';
import { FullWidthColumn } from '../../components/_containers/FullWidthColumn';
import SpacedRow from '../../components/_containers/SpacedRow';

const Container = styled(FullWidthColumn)(({ theme }) => ({
  backgroundColor: theme.bg1,
  borderRadius: 20,
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: 'inset 0px 0px 50px #001F71',
  padding: '20px 30px 45px 30px',
}));

const HeaderContainer = styled(SpacedRow)`
  width: 105%;
`;

const LogoContainer = styled.div`
  display: flex;
  width: 100px;
  height: 15px;
  position: relative;
`;

const Wrapper = styled.div({
  width: '550px',
  position: 'relative',
  background: '#020B38',
  boxShadow: 'inset 0px 0px 50px #001F71',
  borderRadius: '20px',
});

const Shadow = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, #001657 0%, #E7018C 100%)',
  filter: 'blur(75px)',
  zIndex: -1,
});

interface StakeBoostProps {
  actionType: actionTypeType;
  setActionType: (actionType: actionTypeType) => any;
}

const StakeBoost = (props: StakeBoostProps) => {
  return (
    <Container>
      <HeaderContainer>
        <LogoContainer>
          <Image src="/img/logo.svg" layout="fill" alt="logo" />
        </LogoContainer>
        <StyledCloseButton color="#009CE2" />
      </HeaderContainer>
      {props.actionType ? (
        <StakeAction type={props.actionType} onCancel={() => props.setActionType(undefined)} />
      ) : (
        <Stake
          onStake={() => props.setActionType('deposit')}
          onUnStake={() => props.setActionType('withdraw')}
        />
      )}
    </Container>
  );
};
export default StakeBoost;
