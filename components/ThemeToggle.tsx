"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  },[])

  if(!isMounted) {
    return null;
  }

  return theme === "dark" ? (
    <Button onClick={() => setTheme("light")} variant={"ghost"}>
      <Moon />
    </Button>
  ) : (
    <Button onClick={() => setTheme("dark")} variant={"ghost"}>
      <Sun />
    </Button>
  );
}
