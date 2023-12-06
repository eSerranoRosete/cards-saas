import DeleteCardDialog from "@/components/application/DeleteCardDialog";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../EditorWorkspace";
import DialogConfirm from "@/components/Dialogs/DialogConfirm";
import { Button } from "@radix-ui/themes";

type Props = EditorTabProps & {
  cardID?: string;
};

export const TabSettings = ({ isActive, cardID }: Props) => {
  return (
    <PanelHeader
      isActive={isActive}
      title="Settings"
      description="Change the settings of your card"
    >
      {cardID && <DeleteCardDialog cardID={cardID} />}
    </PanelHeader>
  );
};
