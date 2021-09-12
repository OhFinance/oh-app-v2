import { useEffect, useState } from 'react';

type Props = {
  children: (size: { width: number; height: number }) => JSX.Element | null;
  captureRef: React.RefObject<HTMLDivElement> | null;
};

export function CaptureResize(props: Props) {
  const { captureRef } = props;
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const boundingRect = captureRef?.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
    if (boundingRect.width !== 0 && boundingRect.height !== 0) {
      setSize(boundingRect);
    }
  }, [captureRef]);

  if (size.width === 0 || size.height === 0) {
    return null;
  }

  return props.children(size);
}
