import { ToolbarItem } from "@/components/application/toolbar/Toolbar";
import { useState } from "react";

export function useWithAlerts<T extends string>(items: ToolbarItem<T>[]) {
  const [state, setState] = useState(() => {
    return items.map((item) => ({ ...item, hasAlert: false }));
  });

  const setAlert = (tab: T, value: boolean) => {
    setState((prevState) => {
      return prevState.map((item) => {
        if (item.tab === tab) {
          return { ...item, hasAlert: value };
        }
        return item;
      });
    });
  };

  return { setAlert, items: state };
}
