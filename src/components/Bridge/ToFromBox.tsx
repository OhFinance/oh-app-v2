import { AiFillCaretDown } from 'react-icons/ai';
import styled from 'styled-components';

const hoverColor = '#33519e';

const ToFromBox = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: theme.bg2,
  minWidth: '280px',
  height: '215px',
  '&:hover': {
    backgroundColor: hoverColor,
  },
  borderRadius: '20px',
  padding: '20px',
  margin: '20px',
}));

const ChainIcon = styled.img({
  margin: '20px',
});
const IconContainer = styled.p({
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
});

interface ToFromBoxProps {
  children: string;
  icon: string;
  networkName: string;
  openModal: (boolean) => void;
}

export default function BridgePage(props: ToFromBoxProps) {
  return (
    <>
      <ToFromBox
        onClick={() => {
          props.openModal(true);
        }}
      >
        <ChainIcon src={props.icon} alt="networkIcon" width="75px" height="75px" />
        <div>{props.children} </div>
        <IconContainer>
          {props.networkName}
          <AiFillCaretDown />
          {/* <IconContainer>
            <AiFillCaretDown />
          </IconContainer> */}
        </IconContainer>
      </ToFromBox>
    </>
  );
}
