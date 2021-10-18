import { createPopper } from '@popperjs/core';
import React, { useEffect } from 'react';

type Props = { hint?: string };

export function HintButton({ hint }: Props) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [createTooltip, setCreateTooltip] = React.useState(false);
  const btnRef: React.RefObject<HTMLButtonElement> = React.createRef();
  const tooltipRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (!createTooltip || !btnRef.current || !tooltipRef.current) {
      return;
    }
    createPopper(btnRef.current, tooltipRef.current, {
      placement: 'auto',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    setShowTooltip(true);
  }, [showTooltip, btnRef, btnRef.current, tooltipRef, tooltipRef.current]);

  return (
    <>
      <div className="flex flex-wrap w-auto">
        <button
          ref={btnRef}
          type="button"
          className={`rounded-full text-xl font-bold h-6 w-6 flex items-center justify-center bg-pink-800 bg-opacity-50 hover:bg-pink-400`}
          aria-label={hint}
          onMouseEnter={() => setCreateTooltip(true)}
          onMouseLeave={() => {
            setShowTooltip(false);
            setCreateTooltip(false);
          }}
        >
          ?
        </button>
        <div
          ref={tooltipRef}
          className={`${
            showTooltip ? '' : 'hidden'
          } bg-pink-600 border-0 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg`}
        >
          <div>
            <div className="text-white p-3">{hint}</div>
          </div>
        </div>
      </div>
    </>
  );
}
