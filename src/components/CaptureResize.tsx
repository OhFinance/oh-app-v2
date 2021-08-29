import { useLayoutEffect, useState } from 'react';

export function CaptureResize(props) {
  const { captureRef } = props;
  function updateSize() {
    setSize(captureRef.current.getBoundingClientRect());
  }
  useLayoutEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const [size, setSize] = useState({});
  return props.children(size);
}
