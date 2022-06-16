import { transparentize } from 'polished';
import styled from 'styled-components';

export const CloseButton = ({
  color = '#009CE2',
  ...props
}: { color: string } & React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="3" y1="17.5563" x2="18.5563" y2="1.99999" strokeWidth="4" strokeLinecap="round" />
      <line x1="2.82843" y1="2" x2="18.3848" y2="17.5563" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export const StyledCloseButton = styled(CloseButton)(({ theme, color }) => ({
  cursor: 'pointer',
  stroke: color,
  transition: 'stroke 0.1s ease-in',
  width: 16,
  height: 16,
  '&:hover': {
    stroke: transparentize(0.17, color),
  },
}));

export default StyledCloseButton;
