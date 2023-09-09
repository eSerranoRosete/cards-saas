import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isActive?: boolean;
};

export const PanelHeader = ({
  title,
  description,
  children,
  isActive,
}: Props) => {
  return (
    <div className={cn(isActive ? "block" : "hidden")}>
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm mb-5 text-default-400">{description}</p>
      </div>
      {children}
    </div>
  );
};
