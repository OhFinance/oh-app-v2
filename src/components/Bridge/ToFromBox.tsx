import styled from 'styled-components';

const ToFromBox = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: theme.bg2,
  height: '200px',
  width: '250px',
  '&:hover': {
    backgroundColor: theme.bg1,
  },
  borderRadius: '20px',
  padding: '20px',
  margin: '20px',
}));

const ChainIcon = styled.img({
  margin: '20px',
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
        <div>{props.children}</div>
        <div>{props.networkName}</div>
      </ToFromBox>
    </>
  );
}
