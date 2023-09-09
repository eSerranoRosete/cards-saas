import { useEffect } from "react";
import { useToastStore } from "./useToastStore";

export const useToast = () => {
  const store = useToastStore((s) => ({ ...s }));

  useEffect(() => {
    //when toast is set, set a timeout to remove it
    if (store.toast) {
      const timeout = setTimeout(() => {
        store.setToast(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [store.toast]);

  return { set: store.setToast };
};
