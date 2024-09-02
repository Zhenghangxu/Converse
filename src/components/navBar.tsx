import { useState, useEffect, useContext } from "react";
import { Button } from "@nextui-org/button";
import { Tabs, Tab, Divider } from "@nextui-org/react";
import { Trash2, Notebook, Cog, LogOut } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import { NightModeToggle } from "./NightModeToggle";
import { UIContext } from "@/app/_context/ChatContext";
import { clearChatHistory } from "@/app/lib/api";
import { color, motion } from "framer-motion";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import NavDropDown from "./NavDropDown";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Component({
  sessionId,
  reloadChat,
}: {
  sessionId: string;
  reloadChat: any;
}) {
  const [mounted, setMounted] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Clear History");
  const clearHistory = () => {
    setButtonLoading(true);
    setButtonLabel("Clearing...");
    clearChatHistory(sessionId)
      .then(() => {
        setButtonLabel("Cleared!");
        reloadChat();
        setTimeout(() => {
          setButtonLabel("Clear History");
        }, 1000);
      })
      .catch(() => {
        setButtonLoading(false);
        setButtonLabel("Error!");
      });
    setButtonLabel("Clear History");
    setButtonLoading(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.nav
      className="sticky top-0 z-40 backdrop-blur-md bg-white/75 dark:bg-zinc-800/75"
      layout
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-16 items-center px-4">
        <div className="hidden sm:flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-black dark:text-white" />
          <span className="text-lg font-semibold text-black dark:text-white">
            Converse
          </span>
        </div>
        <div className="flex items-center mr-auto sm:ml-[32vw]">
          <Tabs aria-label="Options" className="h-full" size="lg">
            <Tab key="chat" title="Chat"></Tab>
            <Tab key="data" title="Data"></Tab>
          </Tabs>
        </div>
        <div className="flex items-center space-x-4 gap-2 text-default py-4">
          <NightModeToggle />
          {/* <Button
            aria-label="clear-history"
            onClick={clearHistory}
            isLoading={buttonLoading}
            className="bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black"
          >
            {!buttonLoading && <Trash2 />}
            {buttonLabel}
          </Button> */}
          <NavDropDown
            clearHistory={clearHistory}
            buttonLoading={buttonLoading}
          />
        </div>
      </div>
    </motion.nav>
  );
}
