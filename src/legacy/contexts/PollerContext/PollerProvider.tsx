import { useIsBrowserTabActive } from 'hooks/useIsBrowserTabActive';
import { useEffect, useState } from 'react';
import { PollerContext } from './PollerContext';

// https://github.com/pancakeswap/pancake-frontend/blob/develop/src/contexts/RefreshContext.tsx

const FAST_INTERVAL = 10000; // poll every 10s
const SLOW_INTERVAL = 60000; // poll every 60s

// This context maintain 2 counters that can be used as a dependencies on other hooks to poll the blockchain at a specified interval
export const PollerProvider: React.FC = ({ children }) => {
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const isBrowserTabActiveRef = useIsBrowserTabActive();

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  return <PollerContext.Provider value={{ slow, fast }}>{children}</PollerContext.Provider>;
};
