"use client";

import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { ProfileTabProps } from "../page";

export const TabAccountInfo = ({ isActive }: ProfileTabProps) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Account Information"
      description="Update your account information"
    ></PanelHeader>
  );
};
