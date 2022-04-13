import React from 'react';
import { Text, TextProps as TextPropsOriginal } from 'rebass';
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as SCThemeProvider,
} from 'styled-components';
import { AppColors } from './styled';

type TextProps = Omit<TextPropsOriginal, 'css' | 'color'>;

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(
  MEDIA_WIDTHS
).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

function colors(darkMode: boolean): AppColors {
  return {
    bg0: '#000118',
    bg1: 'rgba(0, 40, 141, 0.5)',
    bg2: '#001F71',
    bg3: '#001657',
    bg4: '#001553',

    inputBG: '#000230',
    buttonBG: 'rgba(231, 1, 140, 1)',
    buttonBGHovered: 'rgba(231, 1, 140, 0.87)',

    buttonDisabled: '#312D63',

    white: '#fff',
    grey: '#A4AADF',
    blue: '#009CE2',
  };
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),
    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },
    mediaWidth: mediaWidthTemplates,
    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({ children }: { children: any }) {
  const themeObject = theme(false);
  return <SCThemeProvider theme={themeObject}>{children}</SCThemeProvider>;
}

const TextWrapper = styled(Text)<{
  color?: AppColors;
  lineHeight: string;
  noWrap?: true;
  userSelect?: true;
}>`
  color: ${({ color = 'currentColor', theme }) => (theme as any)[color as any]};
  // Avoid the need for placeholders by setting min-height to line-height.
  min-height: ${({ lineHeight }) => lineHeight};
  // user-select is set to 'none' at the root element (Widget), but is desired for displayed data.
  // user-select must be configured through styled-components for cross-browser compat (eg to auto-generate prefixed properties).
  user-select: ${({ userSelect }) => userSelect && 'text'};
  white-space: ${({ noWrap }) => noWrap && 'nowrap'};
`;

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={400} color={'white'} {...props} />;
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue'} {...props} />;
  },
  Light(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'grey'} {...props} />;
  },
  H1(props: TextProps) {
    return (
      <TextWrapper
        className="headline headline-1"
        fontSize={36}
        fontWeight={400}
        lineHeight="36px"
        noWrap
        {...props}
      />
    );
  },
  H2(props: TextProps) {
    return (
      <TextWrapper
        className="headline headline-2"
        fontSize={32}
        fontWeight={400}
        lineHeight="32px"
        noWrap
        {...props}
      />
    );
  },
  H3(props: TextProps) {
    return (
      <TextWrapper
        className="headline headline-3"
        fontSize={20}
        fontWeight={400}
        lineHeight="20px"
        noWrap
        {...props}
      />
    );
  },
  Subhead1(props: TextProps) {
    return (
      <TextWrapper
        className="subhead subhead-1"
        fontSize={16}
        fontWeight={500}
        lineHeight="16px"
        noWrap
        {...props}
      />
    );
  },
  Subhead2(props: TextProps) {
    return (
      <TextWrapper
        className="subhead subhead-2"
        fontSize={14}
        fontWeight={500}
        lineHeight="14px"
        noWrap
        {...props}
      />
    );
  },
  Body1(props: TextProps) {
    return (
      <TextWrapper
        className="body body-1"
        fontSize={16}
        fontWeight={400}
        lineHeight="24px"
        {...props}
      />
    );
  },
};

export const ThemedGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.bg0} !important;
    min-height: 100%;
    font-size: 16px;
    font-variant: none;
    font-smooth: always;
    font-family: 'Roboto', sans-serif;
    position: relative;
  }
  button {
    user-select: none;
  }

  body {
    display: flex;
    flex-direction: column;
    margin: 0px;
    min-height: 100%;
    flex-grow: 1;
    
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex-grow: 1;
  }

  a {
    color: ${({ theme }) => theme.blue}; 
  }
`;

export * from './components';
