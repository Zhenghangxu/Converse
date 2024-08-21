import { MoonIcon, SunIcon, BarChartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Tabs, Tab } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { clearChatHistory } from "@/app/lib/api";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Component({sessionId}: {sessionId: string}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Clear History");
  const clearHistory = () => {
    setButtonLoading(true);
    setButtonLabel("Clearing...");
    clearChatHistory(sessionId)
      .then(() => {
        setButtonLoading(false);
        setButtonLabel("Cleared!");
        window.location.reload();
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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className=" sticky top-0 z-40 backdrop-blur-md bg-white/75 dark:bg-black/75">
      <div className="flex h-16 items-center px-4">
        <div className="hidden sm:flex items-center space-x-4">
          <BarChartIcon className="h-6 w-6 text-black dark:text-white" />
          <span className="text-lg font-semibold text-black dark:text-white">
            Converse
          </span>
        </div>
        <div className="flex items-center mx-auto">
          <Tabs aria-label="Options" className="h-full" size="lg">
            <Tab key="chat" title="Chat"></Tab>
            <Tab key="data" title="Data"></Tab>
            <Tab key="account" title="Account"></Tab>
          </Tabs>
        </div>
        <div className="flex items-center space-x-4 gap-2">
          <Button
            aria-label="clear-history"
            onClick={clearHistory}
            isLoading={buttonLoading}
          >
            {!buttonLoading && <Trash2 />}
            {buttonLabel}
          </Button>
          <div className="flex items-center space-x-2">
            <Switch
              checked={theme === "dark"}
              onValueChange={toggleTheme}
              aria-label="Toggle dark mode"
              startContent={<SunIcon className="h-[1.2rem] w-[1.2rem]" />}
              endContent={<MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
