import { CurrencyInput } from 'components/CurrencyInput';
import Dropdown from 'components/Dropdown';
import FullWidthColumn from 'components/_containers/FullWidthColumn';
import { Scrollable } from 'components/_containers/Scrollable';
import SpacedRow from 'components/_containers/SpacedRow';
import { useAllTokens } from 'hooks/Tokens';
import { useMemo, useState } from 'react';
import { useModalOpen, useToggleModal } from 'state/application/hooks';
import { ApplicationModal } from 'state/application/reducer';
import styled from 'styled-components';
import OhModal from './common/OhModal';

const InputWrapper = styled(FullWidthColumn)({
  position: 'relative',
  background: '#001F71',
  boxShadow: 'inset 0px 0px 50px #001F71',
  borderRadius: '20px',
  padding: '10px',
  gap: 7,
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0;
  border-radius: 20px;
  background-color: #000230;
  * {
    text-decoration: none
  }
}`;

const ListItem = styled.li<{ active: boolean }>(({ active }) => ({
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  borderRadius: '20px',
  background: active ? '#E7018C' : '#000230',
  color: active ? 'white' : '#009CE2',
  width: '100px',
  padding: '10px',
  cursor: 'pointer',
}));

const Wrapper = styled(Scrollable)({
  position: 'relative',
  left: '-20px',
  right: '-20px',
  width: 'calc(100% + 40px)',
  padding: '0 20px',
});

const Stats = styled(SpacedRow)({
  fontSize: '14px',
  fontWeight: 400,
});

const SubSectionHeading = styled.p({
  width: '100%',
  textAlign: 'center',
  margin: 0,
  fontSize: '17px',
  fontWeight: 500,
  color: '#009CE2',
  overflow: 'hidden',
});

const SectionHeading = styled(SubSectionHeading)`
  &:before,
  &:after {
    background-color: #009ce2;
    content: '';
    display: inline-block;
    height: 1.5px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }
  &:before {
    right: 0.5em;
    margin-left: -50%;
  }
  &:after {
    left: 0.5em;
    margin-right: -50%;
  }
`;

const stakePeriods = ['2 months', '5 months', '8 months', '10 months'];

export const CalculatorModal = () => {
  const isOpen = useModalOpen(ApplicationModal.STAKE_CALCULATOR);
  const toggle = useToggleModal(ApplicationModal.STAKE_CALCULATOR);
  const tokens = useAllTokens();
  const allTokens = useMemo(() => Object.values(tokens), [tokens]);
  const [selectedToken, setSelectedToken] = useState(allTokens[0]);
  const [activeTab, setActiveTab] = useState(0);
  const [totalStaked, setTotalStaked] = useState('0.0');
  const [selectedTokenAmount, setSelectedTokenAmount] = useState('0.0');
  const [ohAmount, setOhAmount] = useState('0.0');
  const [ohSupply, setOhSupply] = useState('0.0');
  const periodOptions = stakePeriods.map((period) => ({ name: period }));
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  return (
    <OhModal title="Boost Calculator" isOpen={isOpen} onDismiss={toggle}>
      <Wrapper>
        <FullWidthColumn gap={10}>
          <SectionHeading>My Staked Deposit</SectionHeading>
          <InputWrapper>
            <Dropdown
              selected={selectedToken}
              onChange={(token) => setSelectedToken(token)}
              options={allTokens}
              optionsHeader="Select Token"
            />
            <CurrencyInput
              currency={selectedToken}
              value={selectedTokenAmount}
              onUserInput={setSelectedTokenAmount}
              hideAvailableBalance
              onReset={() => setSelectedTokenAmount('0.0')}
            />
          </InputWrapper>
          <InputWrapper>
            <SubSectionHeading>Total Staked</SubSectionHeading>
            <CurrencyInput
              currency={selectedToken}
              value={totalStaked}
              onUserInput={setTotalStaked}
              hideAvailableBalance
              onReset={() => setTotalStaked('0.0')}
            />
          </InputWrapper>
          <Stats>
            Pool Share<span>0.0%</span>
          </Stats>
        </FullWidthColumn>
        <Container>
          <List>
            <ListItem active={activeTab === 0} onClick={() => setActiveTab(0)}>
              vOH!
            </ListItem>
            <ListItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
              OH!
            </ListItem>
          </List>
        </Container>
        <FullWidthColumn gap={10}>
          <SectionHeading>{activeTab ? 'My Stacked OH!' : 'My vOH!'}</SectionHeading>
          <InputWrapper>
            <CurrencyInput
              currency={allTokens[0]}
              value={ohAmount}
              onUserInput={setOhAmount}
              hideAvailableBalance
              onReset={() => setOhAmount('0.0')}
            />
            {activeTab ? (
              <Dropdown
                selected={selectedPeriod}
                onChange={(period) => setSelectedPeriod(period)}
                options={periodOptions}
              />
            ) : null}
          </InputWrapper>
          <InputWrapper>
            <SubSectionHeading>Total OH! Supply</SubSectionHeading>
            <CurrencyInput
              currency={allTokens[0]}
              value={ohSupply}
              onUserInput={setOhSupply}
              hideAvailableBalance
              onReset={() => setOhSupply('0.0')}
            />
          </InputWrapper>
        </FullWidthColumn>
      </Wrapper>
      <FullWidthColumn gap={5} py="10px">
        <Stats>
          vOH! Share<span>0.0%</span>
        </Stats>
        <Stats>
          Base APR<span>0.0%</span>
        </Stats>
        <Stats>
          Current Boosted APR<span>0.0%</span>
        </Stats>
        <Stats color="#E7018C">
          Estimated APR<span>0.0%</span>
        </Stats>
      </FullWidthColumn>
    </OhModal>
  );
};

export default CalculatorModal;
