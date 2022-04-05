import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from '../../theme/components';

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${(props) =>
    props.color === 'blue' ? ({ theme }) => theme.blue : ({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 500;
`;

const IconWrapper = styled.div<{ size?: number | null }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

const InfoCard = styled.button<{ active?: boolean }>`
  background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
  padding: 1rem;
  outline: none;
  border: 1px solid;
  border-radius: 12px;
  width: 100% !important;
  border-color: ${({ theme, active }) => (active ? 'transparent' : theme.bg3)};
`;

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;
const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.bg3}` : ``)};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`;

export default function Option({
  active,
  clickable = true,
  onClick = null,
  icon,
  id,
  label,
  color,
  size,
  link = null,
}: {
  link?: string | null;

  onClick?: null | (() => void);
  label: string;
  icon: string;
  id: string;
  size?: number | null;

  active?: boolean;
  clickable?: boolean;
  color?: string;
}) {
  const content = (
    <OptionCardClickable active={active} clickable={clickable && !active} onClick={onClick}>
      <OptionCardLeft>
        <HeaderText color={color}>{label}</HeaderText>
      </OptionCardLeft>
      <IconWrapper size={size}>
        <img src={icon} alt={label} />
      </IconWrapper>
    </OptionCardClickable>
  );

  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>;
  }
  return content;
}
