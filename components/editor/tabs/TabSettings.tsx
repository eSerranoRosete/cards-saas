import DeleteCardDialog from "@/components/application/DeleteCardDialog";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../EditorWorkspace";
import { useCardStore } from "@/context/card/useCardStore";

export const TabSettings = ({ isActive }: EditorTabProps) => {
  const { state } = useCardStore();

  return (
    <PanelHeader
      isActive={isActive}
      title="Settings"
      description="Change the settings of your card"
    >
      {state.id && <DeleteCardDialog cardID={state.id} />}
    </PanelHeader>
  );
};
