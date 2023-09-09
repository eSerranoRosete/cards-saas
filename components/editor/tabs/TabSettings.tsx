import DeleteCardDialog from "@/components/application/DeleteCardDialog";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../EditorWorkspace";

export const TabSettings = ({ isActive }: EditorTabProps) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Settings"
      description="Change the settings of your card"
    >
      <DeleteCardDialog />
    </PanelHeader>
  );
};
