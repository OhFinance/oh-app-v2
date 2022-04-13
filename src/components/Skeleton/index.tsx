import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

interface SkeletonProps {
  animation?: 'pulse' | 'wave' | false;
  variant?: 'text' | 'rect' | 'circular';
  hasChildren?: boolean;
  width?: number | string;
  height?: number | string;
  component?: string;
}

const SkeletonRoot = styled('span')<SkeletonProps>(
  ({ theme, variant, hasChildren, width, height }) => ({
    display: 'block',
    backgroundColor: 'rgba(255, 255, 255, 0.11)',
    height: '1.2em',
    ...(variant === 'text' && {
      marginTop: 0,
      marginBottom: 0,
      height: 'auto',
      transformOrigin: '0 55%',
      transform: 'scale(1, 0.60)',
      borderRadius: `8px/${Math.round((8 / 0.6) * 10) / 10}px`,
      '&:empty:before': {
        content: '"\\00a0"',
      },
    }),
    ...(variant === 'circular' && {
      borderRadius: '50%',
    }),
    ...(hasChildren && {
      '& > *': {
        visibility: 'hidden',
      },
    }),
    ...(hasChildren &&
      !width && {
        maxWidth: 'fit-content',
      }),
    ...(hasChildren &&
      !height && {
        height: 'auto',
      }),
  }),
  ({ animation }) =>
    animation === 'pulse' &&
    css`
      animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
    `,
  ({ animation }) =>
    animation === 'wave' &&
    css`
      position: relative;
      overflow: hidden;
      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      &::after {
        animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `
);

const Skeleton = React.forwardRef(function Skeleton(
  inProps: Omit<SkeletonProps, 'hasChildren'> & React.HTMLAttributes<HTMLSpanElement>,
  ref
) {
  const { animation = 'pulse', variant = 'text', ...other } = inProps;

  return (
    <SkeletonRoot
      ref={ref as any}
      hasChildren={Boolean(other.children)}
      animation={animation}
      variant={variant}
      {...other}
      style={{
        width: other.width,
        height: other.height,
        ...other.style,
      }}
    />
  );
});

export default Skeleton;
