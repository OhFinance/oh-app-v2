import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { Tooltip, TooltipProps } from 'react-tippy';
import styled from 'styled-components';

const TooltipComponent = Tooltip as unknown as React.FC<TooltipProps>;
type InfoBoxProps = {
  text: string;
  className?: string;
};

const TooltipContainer = styled.span`
  display: flex;
  align-items: center;
  column-gap: 0.2rem;
  cursor: pointer;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
`;

const InfoBox = ({ text }: InfoBoxProps) => {
  return (
    <>
      <TooltipComponent position="right" arrow title={text}>
        <TooltipContainer>
          <BsQuestionCircle className="inline" size={14} />
        </TooltipContainer>
      </TooltipComponent>
    </>
  );
};

export default InfoBox;
