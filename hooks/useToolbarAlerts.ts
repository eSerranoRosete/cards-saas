import { ToolbarItem } from "@/components/application/toolbar/Toolbar";
import { useState } from "react";

export function useToolbarAlerts<T>(items: ToolbarItem<T>[]) {
  const mapped = items.map((item) => ({ tab: item.tab, value: false }));

  const [state, setState] = useState(mapped);

  const setAlert = (tab: T, value: boolean) => {
    const newState = state.map((item) => {
      if (item.tab === tab) {
        return { ...item, value };
      }
      return item;
    });
    setState(newState);
  };

  const hasAlert = (tab: T) => {
    const item = state.find((item) => item.tab === tab);
    return item?.value ?? false;
  };

  return { setAlert, hasAlert, alerts: state };
}
