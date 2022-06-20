import UnstyledButton from 'components/UnstyledButton';
import { Scrollable } from 'components/_containers/Scrollable';
import { useState } from 'react';
import styled from 'styled-components';

interface IOption {
  name?: string;
  icon?: string;
}

interface IProps<T extends IOption> {
  options: T[];
  onChange: (option: T) => void;
  selected?: T;
  optionsHeader?: string;
}

const FlyoutMenu = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 99;
`;

const FlyoutMenuContents = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: inset 0px 0px 50px #001f71;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  max-height: 300px;
  padding: 16px;
  box-sizing: border-box;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;
const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 400;
`;

const FlyoutRow = styled.div<{ active?: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg1 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 10px 8px;
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  &:hover {
    opacity: 0.5;
  }
`;
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.blue};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`;

const NetworkLabel = styled.div`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.white};
`;

const DropdownButton = styled(UnstyledButton)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.bg3,
  color: theme.white,
  width: '100%',
  padding: '12px',
  borderRadius: 10,
  fontWeight: 600,
  border: '2px solid transparent',
  transition: 'border 0.1s ease-in',
  fontSize: '1rem',
  '&:hover': {
    border: `2px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const ExpandIcon = styled.svg({
  position: 'relative',
  bottom: -2,
});

const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;

const DropdownOption: React.FC<IOption> = ({ name, icon }) => {
  return (
    <div>
      {icon && <Logo src={icon} />}
      <NetworkLabel>{name}</NetworkLabel>
    </div>
  );
};

export const Dropdown = <T extends IOption>({
  options,
  onChange,
  selected,
  optionsHeader,
}: IProps<T>) => {
  const [show, setShow] = useState(false);
  return (
    <DropdownButton onClick={() => setShow(!show)}>
      <DropdownOption name={selected.name} icon={selected.icon} />
      <ExpandIcon
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 2L6 6L10 2" stroke="#009CE2" strokeWidth="3" strokeLinecap="round" />
      </ExpandIcon>
      {show && (
        <FlyoutMenu>
          <FlyoutMenuContents>
            {optionsHeader && <FlyoutHeader>{optionsHeader}</FlyoutHeader>}
            <Scrollable>
              {options.map((option) => (
                <FlyoutRow key={option.name} onClick={() => onChange(option)}>
                  <DropdownOption name={option.name} icon={option.icon} />
                  {option.name === selected.name && <FlyoutRowActiveIndicator />}
                </FlyoutRow>
              ))}
            </Scrollable>
          </FlyoutMenuContents>
        </FlyoutMenu>
      )}
    </DropdownButton>
  );
};

export default Dropdown;
