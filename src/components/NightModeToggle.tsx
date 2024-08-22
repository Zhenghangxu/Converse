import * as React from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export interface IAppProps {}

export function NightModeToggle(props: IAppProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Switch
      checked={theme === "dark"}
      size="lg"
      onValueChange={toggleTheme}
      aria-label="Toggle dark mode"
      startContent={<SunIcon className="h-[1.2rem] w-[1.2rem]" />}
      endContent={<MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
    />
  );
}
