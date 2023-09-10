import { ToolbarItem } from "@/components/application/toolbar/Toolbar";
import { useEffect, useState } from "react";
import { useURLTab } from "./useURLTab";

type Props<T extends string> = {
  items: ToolbarItem<T>[];
};

export function useTabs<T extends string>({ items }: Props<T>) {
  const tab = useURLTab({ items });
  const [currentTab, setCurrentTab] = useState(tab);

  const setActiveTab = (tab: T) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    setCurrentTab(tab);
  }, [tab]);

  return { activeTab: currentTab, setActiveTab };
}
