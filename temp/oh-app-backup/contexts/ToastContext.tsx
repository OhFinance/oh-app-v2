import React, { useState, useEffect } from "react";

export const ToastContext = React.createContext({ });

export const ToastContextProvider = ({ children }) => {

  return (
    <ToastContext.Provider value={{  }}>
      {children}
    </ToastContext.Provider>
  );
};