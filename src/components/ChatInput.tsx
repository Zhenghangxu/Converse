import * as React from "react";
import { Button } from "@nextui-org/react";
import { MoveUpRight } from "lucide-react";
import { SignOut } from "@/app/_action/signOut";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import type { returnData } from "@/app/_action/signUp";

const initialState = {
  userOutput: null,
  status: 900,
};

export interface ChatInputProps {
  chatState: string;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: any;
  inputHeight?: number;
}
// chat state = "Ready" | "Loading" | "Error" | "Finished";
export default function ChatInput({
  chatState,
  input,
  handleInputChange,
  handleSubmit,
  inputHeight,
}: ChatInputProps) {
  const [logOutState, formAction] = useFormState(SignOut, initialState);
  const router = useRouter();

  React.useEffect(() => {
    if (logOutState.status === 900) {
      return;
    }
    if (logOutState.status === 200) {
      console.log("Log out success");
      router.push("/start/log-in");
    } else {
      console.log("Log out failed");
    }
  }, [logOutState.status, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-3 pb-3 px-2 h-full"
    >
      <input
        className={`text-black ${
          chatState === "Loading" ? "breathing" : ""
        } h-[${inputHeight}px] resize-none box-border border-[2px] border-gray-500/20 dark:bg-zinc-700 hover:dark:bg-zinc-600 hover:bg-gray-200 dark:text-white bg-transparent rounded-3xl focus-visible:rounded-xl focus:shadow-[0_0_0_1px_rgba(37,99,235,0.4)] focus:border-primary-500/30 focus-visible:outline-none w-full h-full py-3 px-5 transition-all duration-200`}
        onChange={handleInputChange}
        value={input}
        maxLength={3000}
        placeholder={
          chatState === "Loading" ? "Generating..." : "Type a message"
        }
      />

      <Button
        isIconOnly
        color="primary"
        variant="solid"
        type="submit"
        size="md"
        isLoading={chatState === "Loading"}
        aria-label="Take a photo"
        className="hidden sm:flex"
      >
        <MoveUpRight className="text-white size-[1.3em]" />
      </Button>
    </form>
  );
}
