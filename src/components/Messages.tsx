import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { Icon } from "@iconify/react";

interface MessageProps {
  messages: TMessage[];
}

export const Messages = ({ messages }: MessageProps) => {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-zinc-800 overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))
      ) : (
        <div className=" place-self-center self-center my-auto">
          <div className="flex flex-col items-center gap-3">
            <Icon icon="flat-color-icons:sms" className="size-20" />
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Ready To Go!</h3>
            <div className="text-gray-800 font-light dark:text-gray-400 inline-block max-w-[200px] text-center">
              Type In the Text Field Below to Send Your First Message
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
