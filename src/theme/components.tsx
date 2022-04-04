import { HTMLProps } from 'react';
import { ExternalLink as LinkIconFeather } from 'react-feather';
import styled from 'styled-components';

export const BorderedLogo = styled.div(({ theme }) => ({
  backgroundColor: theme.bg2,
  width: 37,
  height: 37,
  borderRadius: 50,
  boxShadow: 'inset 3px 3px 6px #000000',
  padding: 5,
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
}));

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;

const LinkIconWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`;

const LinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue};
`;

export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return <StyledLink target={target} rel={rel} href={href} {...rest} />;
}

export function ExternalLinkIcon({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return (
    <LinkIconWrapper target={target} rel={rel} href={href} {...rest}>
      <LinkIcon />
    </LinkIconWrapper>
  );
}
