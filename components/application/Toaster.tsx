import { useToastStore } from "./useToastStore";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <AnimatePresence>
      {store.toast && (
        <motion.div
          variants={fromRight}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            "w-full max-w-xs bg-default text-default-foreground absolute right-5 h-20 rounded-medium p-4 bottom-5",
            store.toast.variant === "success" &&
              "bg-success-500 text-success-foreground",
            store.toast.variant === "error" &&
              "bg-danger text-danger-foreground"
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
