import { PanelHeader } from "@/components/application/panel/PanelHeader";
import React from "react";
import { ProfileTabProps } from "../page";

export const TabAccountSecurity = ({ isActive }: ProfileTabProps) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Account Security"
      description="Update your account security"
    />
  );
};
