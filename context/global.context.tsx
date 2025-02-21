"use client";
import React, { createContext, useState } from "react";

interface GlobalStateProps {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
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
  const [font, setFont] = useState("Fira Code");

  return (
    <GlobalStateContext.Provider value={{ fontSize, setFontSize, font, setFont }}>
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
