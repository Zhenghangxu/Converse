"use client";
import { useEffect, useState, useContext } from "react";
import { useChat } from "ai/react";
import { Messages } from "./Messages";
import NavBar from "@/components/navBar";
import ChatInput from "./ChatInput";
import { UIContext } from "@/app/_context/ChatContext";



export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: any[];
}) => {
  // const [chatState, setChatState] = useState("Ready");
  const inputHeight = 55;
  const { chatState, setChatState } = useContext(UIContext);
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
    onResponse: (response) => {
      setChatState("Loading");
      console.log(response);
    },
    onError: () => {
      setChatState("Error");
    },
    onFinish: () => {
      setChatState("Finished");
      // display sources if available
    },
  });

  const reload = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (isLoading) {
      setChatState("Loading");
    }
  }, [isLoading, setChatState]);

  return (
    <div className="relative min-h-full dark:bg-zinc-800 bg-zinc-200 flex  flex-col justify-between">
      <NavBar sessionId={sessionId} reloadChat={reload} />
      <div
        className={`flex-1 text-black dark:bg-zinc-800 bg-gray-100 justify-between flex flex-col h-screen`}
        style={{
          paddingBottom: `${inputHeight * 1.3}px`,
        }}
      >
        <Messages messages={messages} />
      </div>
      <div
        className={`w-full fixed bottom-0 left-0 right-0 bg-gray-100/75 dark:bg-zinc-800/75 backdrop-blur-md z-10`}
        style={{
          maxHeight: `${inputHeight * 1.3}px`,
        }}
      >
        <div className="container mx-auto h-full">
          {/* insert here */}
          <ChatInput
            chatState={chatState}
            input={input}
            inputHeight={inputHeight}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
