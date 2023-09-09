import { PanelHeader } from "@/components/application/panel/PanelHeader";
import React from "react";
import { EditorTabProps } from "../EditorWorkspace";

export const TabModules = ({ isActive }: EditorTabProps) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Modules"
      description="Add modules to your card"
    ></PanelHeader>
  );
};
