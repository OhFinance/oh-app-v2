export type Color = string;
export interface AppColors {
  // blue backgrounds (darkest -> lightest)
  bg0: Color;
  bg1: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bgPink: Color;
  bgDisabledPink: Color;

  buttonBG: Color;
  buttonDisabled: Color;
  buttonBGHovered: Color;
  inputBG: Color;
  // text color
  white: Color;
  blue: Color;
  grey: Color;
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppColors {
    grids: Grids;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
