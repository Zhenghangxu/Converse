import * as React from "react";
import { Spinner,Button} from "@nextui-org/react";
import {CircleCheck,CircleX,MoveUpRight} from "lucide-react";

export interface ChatInputProps {
    chatState:string;
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: any;
}

export default function ChatInput({
    chatState,
    input,
    handleInputChange,
    handleSubmit
}: ChatInputProps) {
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-2 mt-2">
        {chatState === "Loading" && <Spinner color="default" size="sm" />}
        {chatState === "Error" && (
          <CircleX className="text-black dark:text-white size-5" />
        )}
        {chatState === "Finished" && (
          <CircleCheck className="text-black dark:text-white size-5" />
        )}
        <div className="text-center text-sm text-black dark:text-white font-semibold">
          {chatState === "Finished" ? "Ready" : chatState}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-2 py-3 flex flex-row items-center gap-3"
      >
        <input
          className="text-black resize-none box-border border-[2px] border-gray-500/20 dark:bg-zinc-700 hover:dark:bg-zinc-600 hover:bg-gray-200 max-h-[10vh] shadow-md dark:text-white bg-transparent rounded-3xl focus-visible:rounded-xl focus:border-[3px] focus:border-primary-500/30 focus-visible:outline-none w-full h-full py-3 px-5 transition-all"
          onChange={handleInputChange}
          value={input}
          maxLength={3000}
          placeholder="Enter Your Message Here..."
        />

        <Button
          isIconOnly
          color="primary"
          variant="solid"
          type="submit"
          size="md"
          aria-label="Take a photo"
        >
          <MoveUpRight className="text-white size-[1.3em]" />
        </Button>
      </form>
    </div>
  );
}
