"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { Messages } from "./Messages";
import { Icon } from "@iconify/react";
import NavBar from "@/components/navBar";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: any[];
}) => {
  const inputHeight = 120;
  const { messages, handleInputChange, handleSubmit, input } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  return (
    <div className="relative min-h-full dark:bg-zinc-800 bg-zinc-200 flex  flex-col justify-between">
      <NavBar sessionId={sessionId} />
      <div
        className={`flex-1 text-black dark:bg-zinc-800 bg-gray-100 justify-between flex flex-col`}
        style={{
          paddingBottom: `${inputHeight * 1.1}px`,
        }}
      >
        <Messages messages={messages}/>
      </div>
      <div
        className={`w-full fixed bottom-0 left-0 right-0 bg-white/75 dark:bg-gray-900/75 backdrop-blur-md`}
        style={{
          maxHeight: `${inputHeight * 1.3}px`,
        }}
      >
        <div className="container mx-auto ">
          <form
            onSubmit={handleSubmit}
            className="px-2 py-3 flex flex-row items-start gap-3"
          >
            <input
              className="text-black resize-none max-h-[10vh] shadow-md dark:text-white bg-transparent rounded-3xl border-[1px] border-solid focus:border-gray-800  dark:border-gray-700 w-full h-full py-3 px-5"
              onChange={handleInputChange}
              value={input}
              maxLength={3000}
              placeholder="Enter Your Message Here..."
            />
            <button
              type="submit"
              aria-label="submit"
              className="p-3 rounded-[50%] bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-900 hover:bg-blue-600"
            >
              <Icon
                icon="fluent:send-16-regular"
                fontSize="1.3em"
                className="text-white"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
