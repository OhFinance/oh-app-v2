import UnstyledButton from 'components/UnstyledButton';
import styled, { CSSObject } from 'styled-components';

export type ButtonSizes = 'small' | 'medium' | 'large';

const sizedStyles: Record<ButtonSizes, CSSObject> = {
  small: { padding: '4px 20px 5px 20px', fontSize: 12, fontWeight: 400 },
  medium: { padding: '6px 20px 7px 20px', fontSize: 16, fontWeight: 600 },
  large: { padding: '20px 20px 22px 20px', fontSize: 24, fontWeight: 500 },
};

export default styled(UnstyledButton)<{
  size?: ButtonSizes;
  fullWidth?: boolean;
  disabled?: boolean;
}>(({ theme, size, fullWidth, disabled }) => ({
  backgroundColor: disabled ? theme.buttonDisabled : theme.buttonBG,
  color: disabled ? 'rgba(255, 255, 255, 0.16)' : '#fff',
  borderRadius: 20,
  ...sizedStyles[size || 'medium'],
  width: fullWidth ? '100%' : undefined,
  pointerEvents: disabled ? 'none' : 'auto',
  boxSizing: 'border-box',
  transition: 'box-shadow 0.2s ease-in',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 15px 60px rgba(231, 1, 140, 0.5)',
  },
}));
