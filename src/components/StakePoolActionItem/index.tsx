import styled from 'styled-components';

const Container = styled.div({
  width: '30%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
const FooterContainer = styled.div(({ theme }) => ({
  height: '160px',
  backgroundColor: '#000D38',
  borderRadius: '20px',
  padding: '20px',
  paddingBottom: '30px',
  width: '100%',
  minHeight: '115px',
}));
const ContentContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
}));
interface ContainerProps {
  rightLine?: boolean;
}
const LeftContentContainer = styled.div<ContainerProps>`
  width: 50%;
  display: flex;
  flex-direction: column;
  border-right: ${(props) => (props.rightLine ? `1px ${props.theme.blue} solid` : 'none')};
  padding-right: ${(props) => (props.rightLine ? `3px` : 'none')};
  margin-right: 3px;
`;

const RightContentContainer = styled.div({
  width: '50%',
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  marginLeft: '10px',
});
const Header = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '10px',
});

const Body = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
const Footer = styled.p({
  textAlign: 'center',
  fontSize: '10px',
  color: 'grey',
});

const TokenIcon = styled.img({
  width: '40px',
  height: '40px',
  marginRight: '5px',
});
const BodyTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const BodyText = styled.p({
  margin: '0px',
  fontSize: '12px',
});
const TitleText = styled.p(({ theme }) => ({
  margin: '0',
  fontSize: '16px',
  color: theme.blue,
}));

const ActionButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? props.theme.bgDisabledPink : props.theme.bgPink};
  margin-top: -20px;
  border-radius: 20px;
  height: 60px;
  width: 80%;
  border: ${(props) => (props.disabled ? 'none' : '1px solid #b1026b')};
  box-shadow: ${(props) => (props.disabled ? 'none' : `5px 5px 30px ${props.theme.bgPink}`)};
  font-size: 20px;
  color: white;
`;

interface StakePoolActionItemProp {
  leftTitle: string;
  leftIcon: string;
  leftAmount: string;
  leftSymbol: string;

  rightTitle?: string;
  rightIcon: string;
  rightAmount: string;
  rightSymbol: string;

  divider?: boolean;
  actionText: string;
  action: Function;
  actionDisabled?: boolean;
  footer?: string;
}

const StakePoolActionItem = (props: StakePoolActionItemProp) => {
  return (
    <Container>
      <FooterContainer>
        <ContentContainer>
          <LeftContentContainer rightLine={props.divider}>
            <Header>
              <TitleText>{props.leftTitle}</TitleText>
            </Header>
            <Body>
              <TokenIcon src={props.leftIcon} />
              <BodyTextContainer>
                <BodyText>{props.leftAmount}</BodyText>
                <BodyText>{props.leftSymbol}</BodyText>
              </BodyTextContainer>
            </Body>
          </LeftContentContainer>
          {props.rightIcon && (
            <RightContentContainer>
              <Header>
                {props.rightTitle ? (
                  <TitleText>{props.rightTitle}</TitleText>
                ) : (
                  <TitleText> </TitleText>
                )}
              </Header>
              <Body>
                <TokenIcon src={props.rightIcon} />
                <BodyTextContainer>
                  <BodyText>{props.rightAmount}</BodyText>
                  <BodyText>{props.rightSymbol}</BodyText>
                </BodyTextContainer>
              </Body>
            </RightContentContainer>
          )}
        </ContentContainer>
        <Footer>{props.footer}</Footer>
      </FooterContainer>

      <ActionButton disabled={props.actionDisabled} onClick={() => props.action()}>
        {props.actionText}
      </ActionButton>
    </Container>
  );
};

export default StakePoolActionItem;
