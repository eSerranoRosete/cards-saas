import { PanelHeader } from "@/components/application/panel/PanelHeader";
import React from "react";
import { EditorTabProps } from "../EditorWorkspace";

export const TabSocial = ({ isActive }: EditorTabProps) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Social"
      description="Add social links to your card"
    ></PanelHeader>
  );
};
