"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type UIContextType = {
  isLoggedIn: boolean;
  chatState: string;
  setChatState: Dispatch<SetStateAction<string>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const UIContext = createContext<UIContextType>({} as UIContextType);

export const UIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [chatState, setChatState] = useState<string>("Ready");

  return (
    <UIContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        chatState,
        setChatState,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
