import { useToastStore } from "../useToastStore";

export const useToast = () => {
  const store = useToastStore((s) => ({ ...s }));

  return { set: store.setToast };
};
