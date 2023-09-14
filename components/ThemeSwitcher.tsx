"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Select
      size="sm"
      label="App Theme"
      placeholder="Select an animal"
      className="w-32"
      defaultSelectedKeys={[theme || "system"]}
      onChange={(e) => setTheme(e.target.value)}
    >
      <SelectItem key="dark" value="dark">
        Dark
      </SelectItem>
      <SelectItem key="light" value="light">
        Light
      </SelectItem>
      <SelectItem key="system" value="system">
        System
      </SelectItem>
    </Select>
  );
}
