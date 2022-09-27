import Image from 'next/image';
import { activeTabType } from 'pages/stake';
import styled from 'styled-components';

interface NavType {
  title: string;
  url: string;
  active?: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  * {
    text-decoration: none
  }
}`;

const ListItem = styled.li<{ active: boolean }>(({ active }) => ({
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  borderRadius: '20px',
  background: active ? '#E7018C' : '#001553',
  color: active ? 'white' : '#009CE2',
  width: '100px',
  padding: '10px',
  cursor: 'pointer',
}));

const SettingsButton = styled.div`
  cursor: pointer;
`;

interface NavBarProps {
  activeTab: activeTabType;
  setActiveTab: (activeTab: activeTabType) => void;
}
const NavBar = (props: NavBarProps) => {
  return (
    <Container>
      <List>
        <ListItem active={props.activeTab == 'SWAP'} onClick={() => props.setActiveTab('SWAP')}>
          Swap
        </ListItem>
        <ListItem active={props.activeTab == 'POOL'} onClick={() => props.setActiveTab('POOL')}>
          Pool
        </ListItem>
        <ListItem active={props.activeTab == 'BOOST'} onClick={() => props.setActiveTab('BOOST')}>
          OH! Boost
        </ListItem>
      </List>
      <SettingsButton>
        <Image src="/img/settings.svg" width={20} height={20} alt="settings" />
      </SettingsButton>
    </Container>
  );
};

export default NavBar;
