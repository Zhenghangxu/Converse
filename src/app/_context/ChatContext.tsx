"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";

type UIContextType = {
  isLoggedIn: boolean;
  chatState: string;
  setChatState: Dispatch<SetStateAction<string>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isPWInvalid: boolean;
  setIsPWInvalid: Dispatch<SetStateAction<boolean>>;
};

export const UIContext = createContext<UIContextType>({} as UIContextType);

export const UIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [chatState, setChatState] = useState<string>("Ready");
  const [isPWInvalid, setIsPWInvalid] = useState<boolean>(false);


  return (
    <UIContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        chatState,
        setChatState,
        isPWInvalid,
        setIsPWInvalid,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
