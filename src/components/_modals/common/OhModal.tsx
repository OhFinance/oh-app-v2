import Modal, { ModalProps } from 'components/Modal';
import { transparentize } from 'polished';
import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { ThemedText } from 'theme';

const Wrapper = styled.div(({ theme }) => ({
  padding: '20px 30px 60px 30px',

  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
}));

const Title = styled(ThemedText.H2)(({ theme }) => ({
  color: theme.blue,
}));

const CloseButton = ({
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

const StyledCloseButton = styled(CloseButton)(({ theme, color }) => ({
  cursor: 'pointer',
  stroke: color,
  transition: 'stroke 0.1s ease-in',
  width: 16,
  height: 16,
  '&:hover': {
    stroke: transparentize(0.17, color),
  },
}));

interface OhModalProps extends ModalProps {
  title: string;
}
export default function OhModal({ children, title, onDismiss, ...props }: OhModalProps) {
  return (
    <Modal onDismiss={onDismiss} {...props}>
      <Wrapper>
        <Flex
          alignItems="flex-start"
          justifyContent="space-between"
          width={'100%'}
          marginBottom="8px"
        >
          <div>
            <svg
              width="101"
              height="15"
              viewBox="0 0 101 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2532 10.5002C5.84754 10.5002 5.45443 10.3595 5.14085 10.1022C4.82727 9.84486 4.61261 9.48675 4.53347 9.08889C4.45432 8.69103 4.51558 8.27803 4.7068 7.92027C4.89801 7.56251 5.20737 7.28212 5.58214 7.12688C5.95692 6.97163 6.37393 6.95114 6.76212 7.06889C7.15031 7.18664 7.48566 7.43535 7.71104 7.77263C7.93641 8.10992 8.03787 8.51492 7.99812 8.91863C7.95836 9.32233 7.77985 9.69976 7.49301 9.98661C7.1642 10.3154 6.71822 10.5002 6.2532 10.5002ZM6.2532 2.49359C2.79958 2.49359 0 5.29317 0 8.74679C0 12.2004 2.79958 15 6.2532 15C9.70681 15 12.5064 12.2002 12.5064 8.74679C12.5064 7.08834 11.8476 5.49781 10.6749 4.32511C9.50217 3.15241 7.91165 2.49359 6.2532 2.49359Z"
                fill="#009CE2"
              />
              <path
                d="M20.7269 7.29902V2.96286H25.443V14.5716H20.7269V10.2353H18.5502V14.5716H13.834V2.96286H18.5502V7.29902H20.7269Z"
                fill="#009CE2"
              />
              <path
                d="M28.4639 9.75924L29.7412 0L32.915 0.647626L30.2663 10.1271L28.4639 9.75924Z"
                fill="#009CE2"
              />
              <path
                d="M28.7114 14.773C29.7132 14.773 30.5253 13.9608 30.5253 12.9591C30.5253 11.9573 29.7132 11.1451 28.7114 11.1451C27.7096 11.1451 26.8975 11.9573 26.8975 12.9591C26.8975 13.9608 27.7096 14.773 28.7114 14.773Z"
                fill="#009CE2"
              />
              <path
                d="M64.7803 6.90533L63.6777 10.0118H65.8712L64.8042 6.90533H64.7803Z"
                fill="#009CE2"
              />
              <path
                d="M34.6992 3.10721V14.8132H100.522V3.10721H34.6992ZM45.724 6.38378H41.6334V8.34004H45.1787V9.78612H41.6334V13.2841H39.7719V4.81824H45.724V6.38378ZM49.5882 13.2839H47.7275V4.81806H49.5882V13.2839ZM59.061 13.2839H57.2004L53.6789 7.61644H53.6551V13.2843H51.9121V4.81843H53.7617L57.2947 10.498H57.3187V4.81862H59.0617L59.061 13.2839ZM66.9979 13.2839L66.3575 11.3989H63.1918L62.5279 13.2843H60.6438L63.8571 4.81843H65.7661L68.9313 13.2843L66.9979 13.2839ZM77.6559 13.2839H75.7953L72.2728 7.61682H72.2488V13.2843H70.5059V4.81843H72.3554L75.8887 10.4978H75.9127V4.81862H77.6558L77.6559 13.2839ZM83.7607 13.4856C81.1403 13.4856 79.599 11.5293 79.599 9.08671C79.599 6.57319 81.1403 4.61674 83.7607 4.61674C85.6222 4.61674 87.187 5.70762 87.4127 7.66389H85.6103C85.4918 6.82214 84.6856 6.1819 83.7607 6.1819C82.0889 6.1819 81.4606 7.60454 81.4606 9.08671C81.4606 10.4978 82.0891 11.9205 83.7607 11.9205C84.8988 11.9205 85.5393 11.1379 85.6816 10.0226H87.4838C87.294 12.1335 85.8356 13.4851 83.7607 13.4851V13.4856ZM95.8296 13.2843H89.4032V4.81843H95.7353V6.38378H91.265V8.19789H95.3673V9.64434H91.265V11.7193H95.8293L95.8296 13.2843Z"
                fill="#009CE2"
              />
            </svg>
            <Title>{title}</Title>
          </div>
          <StyledCloseButton color="#009CE2" onClick={onDismiss} />
        </Flex>
        {children}
      </Wrapper>
    </Modal>
  );
}
