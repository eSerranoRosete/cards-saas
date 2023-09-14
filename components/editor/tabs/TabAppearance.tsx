"use client";

import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { useCardStore } from "@/context/card/CardStore";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { Switch } from "@nextui-org/switch";
import { EditorTabProps } from "../EditorWorkspace";

const tabFields = ["title", "description", "organization", "bio"];

export const TabAppearance = ({ isActive, form, setAlert }: EditorTabProps) => {
  const store = useCardStore();

  useWatchErrors({
    form,
    tabFields,
    tab: "appearance",
    setAlert,
  });

  return (
    <PanelHeader
      isActive={isActive}
      title="Card Appearance"
      description="Customize the colors and appearance of your card"
    >
      <Switch
        defaultSelected={store.settings.appearance === "dark"}
        onValueChange={(value) => store.setAppearance(value ? "dark" : "light")}
      >
        Dark Mode
      </Switch>
    </PanelHeader>
  );
};
