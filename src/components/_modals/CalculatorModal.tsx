import { CurrencyInput } from 'components/CurrencyInput';
import Dropdown from 'components/Dropdown';
import InfoBox from 'components/InfoBox';
import FullWidthColumn from 'components/_containers/FullWidthColumn';
import { Scrollable } from 'components/_containers/Scrollable';
import SpacedRow from 'components/_containers/SpacedRow';
import { VeOH_TOKENS } from 'constants/tokens';
import {
  useInvestedBalance,
  useOHBalance,
  useOHBoostStats,
  useProxyTokenBalance,
  useVeOHBalance,
} from 'hooks/stake';
import { useEffect, useMemo, useState } from 'react';
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

const LabelFlex = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.2rem;
`;

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

  // Random token used as prop for currency input
  const dummyToken = VeOH_TOKENS[0].token;

  const [selectedToken, setSelectedToken] = useState(VeOH_TOKENS[0]);
  const [activeTab, setActiveTab] = useState(0);
  const [totalStaked, setTotalStaked] = useState('0.00');
  const [selectedTokenAmount, setSelectedTokenAmount] = useState('0.00');
  const [ohAmount, setOhAmount] = useState('0.00');
  const [ohSupply, setOhSupply] = useState('0.00');
  const periodOptions = stakePeriods.map((period) => ({ name: period }));
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  const ohBalance = useOHBalance();
  const veOHBalance = useVeOHBalance();
  const { veOHSupply, veOHRate } = useOHBoostStats();
  const tokenBalance = useProxyTokenBalance(selectedToken.token);
  const tokenSupply = useInvestedBalance(selectedToken.token);

  useEffect(() => {
    activeTab ? setOhAmount(ohBalance.toFixed(2)) : setOhAmount(veOHBalance.toFixed(2));
  }, [activeTab, ohBalance, veOHBalance]);

  useEffect(() => {
    setOhSupply(veOHSupply.toFixed(2));
  }, [veOHSupply]);

  useEffect(() => {
    setTotalStaked(tokenSupply.toFixed(2));
  }, [tokenSupply]);

  useEffect(() => {
    setSelectedTokenAmount(tokenBalance.toFixed(2));
  }, [tokenBalance, tokenSupply]);

  const estimatedVeHum = useMemo(
    () => veOHRate * 2592000 * +ohAmount * +selectedPeriod.name.split(' ')[0],
    [ohAmount, selectedPeriod.name, veOHRate]
  );

  const veOHShare = (
    100 * (activeTab ? estimatedVeHum / +ohSupply : +ohAmount / +ohSupply)
  ).toFixed(2);

  return (
    <OhModal title="Boost Calculator" isOpen={isOpen} onDismiss={toggle}>
      <Wrapper>
        <FullWidthColumn gap={10}>
          <SectionHeading>My Staked Deposit</SectionHeading>
          <InputWrapper>
            <Dropdown
              selected={selectedToken}
              onChange={setSelectedToken}
              options={VeOH_TOKENS}
              optionsHeader="Select Token"
            />
            <CurrencyInput
              currency={dummyToken}
              value={selectedTokenAmount}
              onUserInput={setSelectedTokenAmount}
              hideAvailableBalance
              onReset={() => setSelectedTokenAmount(tokenBalance.toFixed(2))}
            />
          </InputWrapper>
          <InputWrapper>
            <SubSectionHeading>Total Staked</SubSectionHeading>
            <CurrencyInput
              currency={dummyToken}
              value={totalStaked}
              onUserInput={setTotalStaked}
              hideAvailableBalance
              onReset={() => setTotalStaked(tokenSupply.toFixed(2))}
            />
          </InputWrapper>
          <Stats>
            <LabelFlex>
              Pool Share <InfoBox text="Percentage of the pool you would own." />
            </LabelFlex>

            <span>
              {(totalStaked ? (100 * +selectedTokenAmount) / +totalStaked : 0).toFixed(2)}%
            </span>
          </Stats>
        </FullWidthColumn>
        <Container>
          <List>
            <ListItem active={activeTab === 0} onClick={() => setActiveTab(0)}>
              veOH!
            </ListItem>
            <ListItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
              OH!
            </ListItem>
          </List>
        </Container>
        <FullWidthColumn gap={10}>
          <SectionHeading>{activeTab ? 'My Stacked OH!' : 'My veOH!'}</SectionHeading>
          <InputWrapper>
            <CurrencyInput
              currency={dummyToken}
              value={ohAmount}
              onUserInput={setOhAmount}
              hideAvailableBalance
              onReset={() =>
                activeTab ? setOhAmount(ohBalance.toFixed(2)) : setOhAmount(veOHBalance.toFixed(2))
              }
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
            <SubSectionHeading>Total veOH! Supply</SubSectionHeading>
            <CurrencyInput
              currency={dummyToken}
              value={ohSupply}
              onUserInput={setOhSupply}
              hideAvailableBalance
              onReset={() => setOhSupply(veOHSupply.toFixed(2))}
            />
          </InputWrapper>
        </FullWidthColumn>
      </Wrapper>
      <FullWidthColumn gap={5} py="10px">
        <Stats>
          <LabelFlex>
            veOH! Share
            <InfoBox text="Percentage of veOH Supply you would own." />
          </LabelFlex>
          <span>{veOHShare}%</span>
        </Stats>
        <Stats>
          <LabelFlex>
            Base APR
            <InfoBox text="Base APR is independent of veOH balance." />
          </LabelFlex>
          <span>0.0%</span>
        </Stats>
        <Stats>
          <LabelFlex>
            Current Boosted APR{' '}
            <InfoBox text="Current Boosted APR of OH emissions you are earning." />
          </LabelFlex>
          <span>0.0%</span>
        </Stats>
        <Stats color="#E7018C">
          <LabelFlex>
            Estimated Boosted APR{' '}
            <InfoBox text="Projected Boosted APR of OH emissions you would earn. Actual value affected by veOH distribution." />
          </LabelFlex>
          <span>0.0%</span>
        </Stats>
      </FullWidthColumn>
    </OhModal>
  );
};

export default CalculatorModal;
