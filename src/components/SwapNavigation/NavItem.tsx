import styled from 'styled-components';

const Wrapper = styled.div<{ active?: boolean }>`
  border-radius: 20px;
  padding: 9px 31px 8px 31px;
  color: ${({ active }) => (active ? '#FFF' : '#009ce2')};
  background-color: ${({ active }) => (active ? '#E7018C' : '#001553')};
  cursor: pointer;
`;

const Text = styled.div<{ active?: boolean }>`
  opacity: ${({ active }) => (active ? '100%' : '40%')};
  font-size: 16px;
`;

export default function NavItem({ active, label }: { active?: boolean; label: string }) {
  return (
    <Wrapper active={active}>
      <Text active={active}>{label}</Text>
    </Wrapper>
  );
}
