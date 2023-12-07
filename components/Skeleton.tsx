import { cn } from "@/lib/utils";
import { Box } from "@radix-ui/themes";
import React from "react";

type Props = {
  className?: string;
};

export const Skeleton = ({ className }: Props) => {
  return (
    <Box
      className={cn(
        "dark:bg-zinc-900 bg-zinc-100 rounded-lg animate-pulse",
        className
      )}
    />
  );
};
