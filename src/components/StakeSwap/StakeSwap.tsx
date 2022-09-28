import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';

const Container = styled.div(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.bg3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
}));
const ContentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  margin: '10px',
  borderRadius: '20px',
});
// LOGO
const LogoContainer = styled.div({
  width: '100%',
  padding: '0 20px 0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});
const Logo = styled.img({
  height: '20px',
});
const CloseX = styled.p({
  color: '#009CE2',
  fontSize: '20px',
  fontWeight: 'bolder',
});
// inputs
const FromInput = styled.input(({ theme }) => ({
  height: '70px',
  width: '100%',
  backgroundColor: theme.inputBG,
  border: 'none',
  borderRadius: '20px',
  zIndex: '10',
  textAlign: 'right',
  fontSize: '20px',
  color: '#A4AADF',
  padding: '10px 45px 10px 10px',
  '&::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
  },
  '&::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
}));
const ToInput = styled.input(({ theme }) => ({
  height: '70px',
  backgroundColor: theme.inputBG,
  border: 'none',
  borderRadius: '20px',
  zIndex: '10',
  textAlign: 'right',
  fontSize: '20px',
  color: '#A4AADF',
  '&::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
  },
  '&::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
  padding: '10px',
}));

const DownButton = styled.button(({ theme }) => ({
  backgroundColor: theme.bgPink,
  borderRadius: '100px',
  height: '58px',
  width: '58px',
  // without minWidth, the button gets squished to fit the other elements
  minWidth: '58px',
  border: 'none',
  fontSize: '50px',
  color: 'white',
  fontWeight: 'bolder',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '5px',
  zIndex: '10',
  '&:hover': {
    backgroundColor: '#ad056b',
    cursor: 'pointer',
  },
  '&:active': {
    backgroundColor: '#c41a81',
    cursor: 'pointer',
  },
}));

const BlueFillerContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '70px',
  backgroundColor: theme.inputBG,
}));

interface BlueFiller {
  facingLeft?: boolean;
}

const BlueFiller = styled.div<BlueFiller>`
  width: 60%;
  height: 70px;
  background-color: ${(props) => props.theme.bg3};
  border-radius: ${(props) => (props.facingLeft ? `20px 0 0 20px` : `0 20px 20px 0`)};
  margin: ${(props) => (props.facingLeft ? `0 0 0 -15px` : `0 -15px 0 0`)};
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
const BlueText = styled.p(({ theme }) => ({
  fontSize: '12px',
  color: theme.blue,
  margin: '3px',
}));

const ConnectButton = styled.button(({ theme }) => ({
  backgroundColor: theme.bgPink,
  width: '80%',
  height: '60px',
  border: 'none',
  borderRadius: '20px',
  color: 'white',
  fontSize: '25px',
  marginBottom: '-30px',
  '&:hover': {
    backgroundColor: '#ad056b',
    cursor: 'pointer',
  },
  '&:active': {
    backgroundColor: '#c41a81',
    cursor: 'pointer',
  },
}));

const ConnectButtonContainer = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '50px',
});

const FromInputContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
const MaxButton = styled.button(({ theme }) => ({
  backgroundColor: theme.bgPink,
  width: '60px',
  height: '40px',
  position: 'absolute',
  zIndex: '11',
  color: 'white',
  marginRight: '-20px',
  borderRadius: '20px',
  border: 'none',
  '&:hover': {
    backgroundColor: '#ad056b',
    cursor: 'pointer',
  },
  '&:active': {
    backgroundColor: '#c41a81',
    cursor: 'pointer',
  },
}));

const StakeSwap = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo src={logo} alt={'logo'} />
        <CloseX>
          <AiOutlineCloseCircle />
        </CloseX>
      </LogoContainer>
      <ContentContainer>
        <BlueText>From</BlueText>
        <FromInputContainer>
          <FromInput type={'number'} placeholder={'0.0'}></FromInput>
          <MaxButton>Max</MaxButton>
        </FromInputContainer>
        <BlueFillerContainer>
          <BlueFiller>
            <BlueText>To</BlueText>
          </BlueFiller>
          <DownButton>
            <BsChevronDown />
          </DownButton>
          <BlueFiller facingLeft={true} />
        </BlueFillerContainer>
        <ToInput type={'number'} placeholder={'0.0'} />
      </ContentContainer>
      <ConnectButtonContainer></ConnectButtonContainer>
      <ConnectButton> Connect Wallet</ConnectButton>
    </Container>
  );
};

export default StakeSwap;
