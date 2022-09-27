import Spinner from 'components/Spinner';
import StakeBoost from 'components/StakeBoost';
import StakePool from 'components/StakePool';
import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import { FullWidthColumn } from '../../components/_containers/FullWidthColumn';
import SpacedRow from '../../components/_containers/SpacedRow';

const Container = styled(FullWidthColumn)(({ theme }) => ({
  backgroundColor: theme.bg1,
  borderRadius: 20,
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: 'inset 0px 0px 50px #001F71',
  padding: '20px 30px 45px 30px',
}));

const HeaderContainer = styled(SpacedRow)`
  width: 105%;
`;

const LogoContainer = styled.div`
  display: flex;
  width: 100px;
  height: 15px;
  position: relative;
`;

const Wrapper = styled.div({
  width: '550px',
  position: 'relative',
  background: '#020B38',
  boxShadow: 'inset 0px 0px 50px #001F71',
  borderRadius: '20px',
});

const Shadow = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, #001657 0%, #E7018C 100%)',
  filter: 'blur(75px)',
  zIndex: -1,
});

const BOOST = 'BOOST';
const SWAP = 'SWAP';
const POOL = 'POOL';
export type activeTabType = 'BOOST' | 'SWAP' | 'POOL';
export type actionTypeType = 'withdraw' | 'deposit';
export const StakePage = () => {
  const [actionType, setActionType] = useState<actionTypeType>();
  const [activeTab, setActiveTab] = useState<activeTabType>(POOL);

  let content = <Spinner />;
  switch (activeTab) {
    case BOOST:
      content = (
        <StakeBoost
          actionType={actionType}
          setActionType={(actionType: actionTypeType) => setActionType(actionType)}
        />
      );
      break;
    default:
      content = <StakePool />;
      break;
  }

  return (
    <FullWidthColumn flexGrow={1}>
      <Wrapper>
        {activeTab == BOOST || activeTab == SWAP ? <Shadow /> : <></>}
        <NavBar
          activeTab={activeTab}
          setActiveTab={(activeTab: activeTabType) => setActiveTab(activeTab)}
        />
        {activeTab == BOOST || activeTab == SWAP ? content : <></>}
      </Wrapper>
      {activeTab == POOL ? content : <></>}
    </FullWidthColumn>
  );
};

export default StakePage;
