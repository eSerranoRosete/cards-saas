import { create } from "zustand";

export type Toast = {
  title?: string;
  message?: string;
  variant?: "success" | "error";
};

type StoreState = {
  toast: Toast | null;
};

type StoreActions = {
  setToast: (toast: Toast | null) => void;
};

export const useToastStore = create<StoreState & StoreActions>((set) => ({
  toast: null,
  setToast: (toast) => set({ toast }),
}));
