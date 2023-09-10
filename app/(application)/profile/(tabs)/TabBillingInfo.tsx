import { PanelHeader } from "@/components/application/panel/PanelHeader";
import React from "react";
import { ProfileTabProps } from "../page";

export const TabBillingInfo = ({ isActive }: ProfileTabProps) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Billing Information"
      description="Update your billing information"
    />
  );
};
