import Button from 'components/Button';
import { CurrencyInput } from 'components/CurrencyInput';
import React, { useMemo, useRef } from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import placeholder from '~/assets/img/oh-usdc-moonriver.png';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: 20,
});

const Left = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
});

const ContainerBase = styled.div(({ theme }) => ({
  backgroundColor: theme.bg1,
  borderRadius: 20,
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: 'inset 0px 0px 50px #001F71',
  padding: 20,
}));

const Logo = styled.img<{ size?: 'small' | 'big' }>(({ size }) => ({
  width: size && size === 'small' ? 24 : 50,
  height: size && size === 'small' ? 24 : 50,
  boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.14)',
}));

const DepositContainer = styled(ContainerBase)({ padding: 20 });
const RightContainer = styled(ContainerBase)({
  display: 'flex',
  flexDirection: 'column',

  padding: 30,
});

const DepositBalance = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: '20px',
  lineHeight: '20px',
  fontWeight: 400,
  marginLeft: 10,
  color: theme.white,
}));

const ChartContainer = styled.div(({ theme }) => ({
  padding: 20,
  width: '100%',
  backgroundColor: theme.bg1,
  borderRadius: 20,
  boxSizing: 'border-box',
  flexGrow: 1,
}));

const StatsContainer = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: 10,
  backgroundColor: theme.bg3,
  borderRadius: 20,
  padding: 10,
  boxSizing: 'border-box',
  width: '100%',
  marginTop: 10,
  boxShadow: 'inset 0px 0px 50px #001F71',
}));

const StatsItem = styled.div<{ noBg?: boolean }>(({ theme, noBg }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '25px 30px 28px 30px',
  backgroundColor: noBg ? 'transparent' : theme.bg1,
  borderRadius: 20,
  boxSizing: 'border-box',
}));

const StatsTitle = styled.p(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '16px',
  color: theme.blue,
  fontWeight: 400,
  margin: 0,
  paddingBottom: 4,
}));

const StatsValue = styled.p(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '14px',
  color: theme.white,
  fontWeight: 400,
  margin: 0,
}));

const CardTokenTitle = styled.div({
  paddingLeft: 16,
});

// change for themed h2
const Symbol = styled.h2({
  fontSize: '28px',
  lineHeight: '28px',
  fontWeight: 500,
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
});

const SubHeading = styled.h4({
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.87)',
  fontWeight: 500,
  lineHeight: '14px',
  margin: 0,
});

const APRContainer = styled.div(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '17px 20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  backgroundColor: theme.bg2,
  borderRadius: 20,
  marginTop: 30,
  marginBottom: 10,
}));

const TitleText = styled.h5(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '20px',
  margin: 0,
  fontWeight: 500,
}));

const APRTitle = styled(TitleText)(({ theme }) => ({
  color: theme.grey,
}));

const PortfolioTitle = styled(TitleText)(({ theme }) => ({
  color: theme.grey,
  paddingRight: 16,
  fontWeight: 400,
}));

const PortfolioBalance = styled.h3(({ theme }) => ({
  color: theme.white,
  margin: 0,
  fontWeight: 400,
  fontSize: '56px',
  lineHeight: '56px',
}));

const APRValue = styled.h3(({ theme }) => ({
  fontSize: '36px',
  lineHeight: '36px',
  color: theme.white,
  margin: 0,
  fontWeight: 600,
}));

const Stat = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.grey,
  fontSize: '14px',
  lineHeight: '16px',
  textAlign: 'right',
  padding: '0px 0px 8px',
  '& span': {
    color: theme.white,
  },
}));

const OverflowingButton = styled(Button)({
  position: 'relative',
});

export default function BankPage() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const buttonHeight: number | null = useMemo(() => {
    if (buttonRef.current) {
      return buttonRef.current.getBoundingClientRect().height;
    }
    return null;
  }, [buttonRef.current]);

  return (
    <Grid>
      {/* <OhModal title="Deposit USDC.e" isOpen onDismiss={() => false}>
        <DepositView />
      </OhModal> */}
      <Left>
        <DepositContainer
          style={
            buttonHeight !== null
              ? {
                  marginBottom: `${buttonHeight / 2}px`,
                }
              : undefined
          }
        >
          <Flex alignItems={'center'}>
            <Logo src={placeholder} alt="placeholder" />
            <CardTokenTitle>
              <Symbol>OH! USDC.e</Symbol>
              <SubHeading>Deposit USDC.e to earn yield</SubHeading>
            </CardTokenTitle>
          </Flex>
          <APRContainer>
            <APRTitle>
              <span style={{ fontSize: '14px' }}>Earning Rate</span>
              <br /> APY
            </APRTitle>
            <APRValue>10.00%</APRValue>
          </APRContainer>
          <Stat>
            TVL <span>$768,000.00</span>
          </Stat>
          <Stat>
            Share Price <span>$1.031</span>
          </Stat>

          <CurrencyInput
            logoUrl={'/img/usdc.svg'}
            value="12"
            id="input"
            onUserInput={(some) => null}
            style={
              buttonHeight !== null
                ? {
                    bottom: `-${buttonHeight / 2 + 12}px`,
                    marginTop: `-${buttonHeight / (2 + 12) - 30}px`,
                  }
                : undefined
            }
            showMaxButton
          />

          <OverflowingButton
            ref={buttonRef}
            size="large"
            fullWidth
            style={
              buttonHeight !== null
                ? {
                    bottom: `-${buttonHeight / 2 + 20}px`,
                  }
                : undefined
            }
          >
            Deposit
          </OverflowingButton>
        </DepositContainer>

        <DepositContainer
          style={
            buttonHeight !== null
              ? {
                  marginBottom: `${buttonHeight / 2}px`,
                }
              : undefined
          }
        >
          <Flex alignItems={'center'}>
            <Logo src={placeholder} alt="placeholder" />
            <CardTokenTitle>
              <Symbol>OH! USDC.e</Symbol>
            </CardTokenTitle>
          </Flex>
          <CurrencyInput
            logoUrl={'/img/usdc.svg'}
            value="12"
            id="input"
            onUserInput={(some) => null}
            style={
              buttonHeight !== null
                ? {
                    bottom: `-${buttonHeight / 2 + 12}px`,
                    marginTop: `-${buttonHeight / (2 + 12)}px`,
                  }
                : undefined
            }
            showMaxButton
          />
          <OverflowingButton
            ref={buttonRef}
            size="large"
            fullWidth
            style={
              buttonHeight !== null
                ? {
                    bottom: `-${buttonHeight / 2 + 20}px`,
                  }
                : undefined
            }
          >
            Withdraw
          </OverflowingButton>
        </DepositContainer>
      </Left>
      <RightContainer>
        <Flex alignItems="flex-end" marginBottom={25}>
          <PortfolioTitle>
            <span style={{ fontSize: '28px' }}>Portfolio</span>
            <br />
            Balance
          </PortfolioTitle>
          <PortfolioBalance>$1200</PortfolioBalance>
          <Flex marginLeft="auto">
            <Logo src={placeholder} alt="placeholder" size="small" />
            <DepositBalance>$0.00 OH-USDC (Deposited USDC)</DepositBalance>
          </Flex>
        </Flex>
        <ChartContainer></ChartContainer>
        <StatsContainer>
          <StatsItem>
            <Flex alignItems="center">
              <Logo src={placeholder} alt="placeholder" />
              <div style={{ marginLeft: 10 }}>
                <StatsTitle>Token Price</StatsTitle>
                <StatsValue>$ 0.02</StatsValue>
              </div>
            </Flex>
          </StatsItem>
          <StatsItem>
            <StatsTitle>Circulating Supply</StatsTitle>
            <StatsValue>123,456 OH</StatsValue>
          </StatsItem>
          <StatsItem>
            <StatsTitle>Market Cap</StatsTitle>
            <StatsValue>$ 934,234</StatsValue>
          </StatsItem>
          <StatsItem noBg>
            <StatsTitle>Total Value Locked</StatsTitle>
            <StatsValue>$108,295</StatsValue>
          </StatsItem>
        </StatsContainer>
      </RightContainer>
    </Grid>
  );
}
