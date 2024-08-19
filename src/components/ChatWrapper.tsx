"use client";

import { useChat } from "ai/react";
import { Messages } from "./Messages";
import { Icon } from "@iconify/react";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: any[];
}) => {
  const { messages, handleInputChange, handleSubmit, input } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });
  return (
    <div className="relative min-h-full dark:bg-zinc-900 bg-zinc-200 flex divide-y dark:divide-zinc-700 divide-zinc-300 flex-col justify-between gap-2">
      <div className="flex-1 text-black dark:bg-zinc-800 justify-between flex flex-col pb-[103px]">
        <Messages messages={messages} />
      </div>
      <div className="w-full fixed bottom-0 left-0 max-h-[103px] right-0 bg-zinc-100 dark:bg-zinc-800">
        <div className="container mx-auto ">
          <form
            onSubmit={handleSubmit}
            className="px-2 py-3 flex flex-row items-start gap-3"
          >
            <textarea
              rows={6}
              className="text-black resize-none max-h-[10vh] shadow-md dark:text-white bg-transparent rounded-md border-[1px] border-solid focus:border-gray-800  dark:border-gray-700 w-full h-full p-3"
              onChange={handleInputChange}
              value={input}
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


