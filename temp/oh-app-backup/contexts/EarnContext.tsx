import { useState, useCallback, createContext } from "react";

type DisplayMode = "card" | "table";

interface IEarnContext {
  displayMode: DisplayMode;
  // toggleDisplayMode: () => void;
  setCardDisplay: () => void;
  setTableDisplay: () => void;
}

export const EarnContext = createContext<IEarnContext>({ 
  displayMode: "table",
  setCardDisplay: () => {},
  setTableDisplay: () => {}

});

export const EarnContextProvider = ({ children }) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('table');

  const setCardDisplay = useCallback(() => {
    // console.log(displayMode)
      setDisplayMode('card')
    
  }, [setDisplayMode])

  const setTableDisplay = useCallback(() => {
    // console.log(displayMode)
      setDisplayMode('table')
    
  }, [setDisplayMode])

  return (
    <EarnContext.Provider value={{ 
      displayMode,
      // toggleDisplayMode
      setCardDisplay,
      setTableDisplay
    }}>
      {children}
    </EarnContext.Provider>
  );
};