import Image from 'next/image';
import styled from 'styled-components';

interface NavType {
  title: string;
  url: string;
  active?: boolean;
}

const navs: NavType[] = [
  {
    title: 'Swap',
    url: '/',
  },
  {
    title: 'Pool',
    url: '/pool',
  },
  {
    title: 'OH! Boost',
    url: '/stake',
    active: true,
  },
];

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

const NavBar = () => {
  return (
    <Container>
      <List>
        {navs.map((nav: NavType, index: number) => (
          <ListItem key={index} active={nav.active}>
            {nav.title}
          </ListItem>
        ))}
      </List>
      <SettingsButton>
        <Image src="/img/settings.svg" width={20} height={20} alt="settings" />
      </SettingsButton>
    </Container>
  );
};

export default NavBar;
