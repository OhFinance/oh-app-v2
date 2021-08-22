import React, { useState, useEffect } from "react";

const FAST_INTERVAL = 10000; // poll every 10s
const SLOW_INTERVAL = 60000; // poll every 60s

export const PollerContext = React.createContext({ slow: 0, fast: 0 });

// This context maintain 2 counters that can be used as a dependencies on other hooks to poll the blockchain at a specified interval
export const PollerContextProvider = ({ children }) => {
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <PollerContext.Provider value={{ slow, fast }}>
      {children}
    </PollerContext.Provider>
  );
};
