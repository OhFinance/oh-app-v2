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

const ContentContainer = styled.div({
  marginBottom: '20px',
  height: 'auto',
});

interface ContainerProps {
  zIndex: number;
}
const Container = styled.div<ContainerProps>((props) => ({
  zIndex: props.zIndex,
}));

interface WarningModalProps {
  title: string;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => any;
  children: any;
  zIndex?: number;
}

export default function WarningModal(props: WarningModalProps) {
  return (
    <Container zIndex={props.zIndex ? props.zIndex : 5}>
      <OhModal title={''} isOpen={props.isOpen} onDismiss={() => props.setModalOpen(false)}>
        <ContentContainer>
          <WarningContainer>
            <WarningImage src={warningImage} alt="Warning sign" />
            <WarningTitle>{props.title}</WarningTitle>
          </WarningContainer>

          <WarningText>{props.children}</WarningText>
        </ContentContainer>
      </OhModal>
    </Container>
  );
}
