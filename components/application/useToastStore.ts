import { create } from "zustand";

export type Toast = {
  title?: string;
  message?: string;
  variant?: "success" | "error";
};

export type ToastContent = {
  title?: string;
  message?: string;
};

type StoreState = {
  toast: Toast | null;
};

type StoreActions = {
  setToast: (toast: Toast | null) => void;
  success: (contet: ToastContent) => void;
  error: (contet: ToastContent) => void;
};

export const useToastStore = create<StoreState & StoreActions>((set) => ({
  toast: null,
  setToast: (toast) => set({ toast }),
  success: ({ title, message }: ToastContent) =>
    set({ toast: { message, title, variant: "success" } }),
  error: ({ title, message }: ToastContent) =>
    set({ toast: { message, title, variant: "error" } }),
}));
