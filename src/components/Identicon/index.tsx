import jazzicon from '@metamask/jazzicon';
import { useWeb3React } from '@web3-react/core';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

const StyledIdenticon = styled.div(({ theme }) => ({
  backgroundColor: theme.bg2,
  padding: 5,
  borderRadius: 50,
  boxShadow: 'inset 3px 3px 6px #000000',
  boxSizing: 'border-box',
}));

export default function Identicon() {
  const { account } = useWeb3React();

  const icon = useMemo(
    () => account && jazzicon(27, parseInt(account.slice(2, 10), 16)),
    [account]
  );
  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const current = iconRef.current;
    if (icon) {
      current?.appendChild(icon);
      return () => {
        try {
          current?.removeChild(icon);
        } catch (e) {
          console.error('Avatar icon not found');
        }
      };
    }
    return;
  }, [icon, iconRef]);

  return (
    <StyledIdenticon>
      <span ref={iconRef} />
    </StyledIdenticon>
  );
}
