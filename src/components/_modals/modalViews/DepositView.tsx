import Button from 'components/Button';
import React from 'react';
import { Flex, Text } from 'rebass';
import styled from 'styled-components';
import { ThemedText } from 'theme';
import { ModalView } from '.';
import ModalIcon from '../common/ModalIcon';

const Wrapper = styled.div({
  position: 'relative',
  overflow: 'show',
});

const StatLabel = styled(Text)(({ theme }) => ({
  color: theme.grey,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '14px',
  textAlign: 'right',
  paddingBottom: 4,
}));
const StatValue = styled(Text)(({ theme }) => ({
  color: theme.white,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  textAlign: 'right',
}));

const BarWrapper = styled.div<{ size: string | number }>(({ size }) => ({
  position: 'relative',
  height: size,
  width: 2,
  marginRight: 8,
  background: 'linear-gradient(180deg, #E7018C 0%, #009CE2 100%)',
}));

const Spacer = styled.div({
  width: '100%',
  boxSizing: 'border-box',
  height: 30,
});

const Dot = styled.div({
  width: 6,
  height: 6,
  borderRadius: 6,
  backgroundColor: '#2775CA',
  position: 'absolute',
});

const Start = styled(Dot)({
  top: 0,
  left: '50%',
  transform: 'translate(-50%, 0%)',
});

const End = styled(Dot)({
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 0%)',
});

const Stat = styled.div`
  padding-bottom: 8px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  position: relative;
  z-index: 99;
  margin-top: 20px;
  & button {
    width: 100%;
  }
  & button:not(last-child) {
    margin-right: 16px;
  }
`;

export default function DepositView() {
  return (
    <>
      <Wrapper>
        <ModalIcon view={ModalView.DEPOSIT_COMPLETE} hash="test" />
        <Flex flexDirection="row" justifyContent="space-between" marginTop="8px">
          <Flex flexDirection={'row'} alignItems="flex-end">
            <BarWrapper size={110}>
              <Start />
              <End />
            </BarWrapper>
            <Flex flexDirection={'column'}>
              <ThemedText.Main fontSize="14px">Deposit</ThemedText.Main>
              <ThemedText.Main fontSize="26px">10.000</ThemedText.Main>
              <Flex alignItems={'center'}>
                <img
                  width={16}
                  height={16}
                  src="/img/usdc.svg"
                  alt="usdc"
                  style={{ marginRight: 3, borderRadius: 16 }}
                />
                <ThemedText.Main fontSize="16px">USDC.e</ThemedText.Main>
              </Flex>

              <Spacer />
              <ThemedText.Main fontSize="14px">Deposit</ThemedText.Main>
              <ThemedText.Main fontSize="26px">10.000</ThemedText.Main>
              <Flex alignItems={'center'}>
                <img
                  width={16}
                  height={16}
                  src="/img/usdc.svg"
                  alt="usdc"
                  style={{ marginRight: 3, borderRadius: 16 }}
                />
                <ThemedText.Main fontSize="16px">USDC.e</ThemedText.Main>
              </Flex>
            </Flex>
          </Flex>

          <div>
            <Stat>
              <StatLabel>Bank Token Rate</StatLabel>
              <StatValue>1 OH-USDC.e = 1.031446 USDC.e</StatValue>
            </Stat>
            <Stat>
              <StatLabel>Share of Bank</StatLabel>
              <StatValue>0.88%</StatValue>
            </Stat>
          </div>
        </Flex>
      </Wrapper>
      <Buttons>
        <Button size="large">Cancel</Button>
        <Button size="large">Confirm</Button>
      </Buttons>
    </>
  );
}
