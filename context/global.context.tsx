"use client";
import React, { createContext, useState } from "react";

interface GlobalStateProps {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalStateContext = createContext<GlobalStateProps | undefined>(
  undefined
);

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontSize, setFontSize] = useState<number>(20);

  return (
    <GlobalStateContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateProps => {
  const context = React.useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
