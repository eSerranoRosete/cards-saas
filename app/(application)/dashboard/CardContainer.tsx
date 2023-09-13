import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const CardContainer = ({ children, className }: Props) => {
  return (
    <section className={cn("grid grid-cols-4 gap-4", className)}>
      {children}
    </section>
  );
};
