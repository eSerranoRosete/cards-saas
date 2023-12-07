import { useToastStore } from "../useToastStore";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export const Toaster = () => {
  const store = useToastStore((s) => ({ ...s }));

  const fromRight = {
    initial: { x: "100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: { x: "100%", opacity: 0 },
  };

  useEffect(() => {
    //when toast is set, set a timeout to remove it
    if (store.toast) {
      const timeout = setTimeout(() => {
        store.setToast(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [store]);

  return (
    <AnimatePresence>
      {store.toast && (
        <motion.div
          variants={fromRight}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            "w-full max-w-xs bg-default text-default-foreground absolute right-5 h-20 rounded-md p-4 bottom-5",
            store.toast.variant === "success" && "bg-green-500 text-zinc-900",
            store.toast.variant === "error" && "bg-red-500 text-zinc-100"
          )}
        >
          <button
            onClick={() => store.setToast(null)}
            className="absolute right-3 top-3"
          >
            <XIcon className="w-4" />
          </button>

          <p className="text-md font-semibold">{store.toast?.title}</p>
          <p className="text-sm">{store.toast?.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
