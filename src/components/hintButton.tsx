import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import styleModule from './__styles__/hintButton.module.css';

type Props = { hint?: string };

export function HintButton({ hint }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  function show() {
    setShowTooltip(true);
  }
  function hide() {
    setShowTooltip(false);
  }

  return (
    <>
      <div className="flex flex-wrap w-auto justify-end">
        <button
          ref={setReferenceElement as any}
          type="button"
          className={`rounded-full text-xl font-bold h-6 w-6 flex items-center justify-center bg-pink-800 bg-opacity-50 hover:bg-pink-400`}
          aria-label={hint}
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
        >
          ?
        </button>
      </div>
      {showTooltip && (
        <div
          id={styleModule.tooltip}
          ref={setPopperElement as any}
          className="bg-pink-600 border-0 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
          style={styles.popper}
          {...attributes.popper}
        >
          <div>
            <div className="text-white p-3">{hint}</div>
          </div>
          <div id={styleModule.arrow} ref={setArrowElement as any} style={styles.arrow} />
        </div>
      )}
    </>
  );
}
