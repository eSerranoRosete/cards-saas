import { ToolbarItem } from "@/components/application/toolbar/Toolbar";
import { useSearchParams } from "next/navigation";

type Props<T extends string> = {
  items: ToolbarItem<T>[];
};

export function useURLTab<T extends string>({ items }: Props<T>): T {
  const defaultTab = items[0].tab;

  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");

  if (!urlTab) {
    return defaultTab;
  }

  const tab = items.find((item) => item.tab === urlTab);

  if (tab) {
    return tab.tab;
  }

  return defaultTab;
}
