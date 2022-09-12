import styled from 'styled-components';
import warningImage from '../../../assets/img/Warning.svg.png';
import OhModal from './OhModal';

const WarningContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const WarningText = styled.div({
  textAlign: 'center',
});

const WarningImage = styled.img({
  width: '50px',
  height: '50px',
});

const WarningTitle = styled.p({
  color: 'red',
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '0px',
});

const Container = styled.div({
  marginBottom: '-40px',
});

interface WarningModalProps {
  title: string;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => any;
  children: any;
}

export default function WarningModal(props: WarningModalProps) {
  return (
    <OhModal title={''} isOpen={props.isOpen} onDismiss={() => props.setModalOpen(false)}>
      <Container>
        <WarningContainer>
          <WarningImage src={warningImage} alt="Warning sign" />
          <WarningTitle>{props.title}</WarningTitle>
        </WarningContainer>

        <WarningText>{props.children}</WarningText>
      </Container>
    </OhModal>
  );
}
