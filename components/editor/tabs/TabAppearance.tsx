"use client";

import { SwitchCard } from "@/components/application/SwitchCard";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { useCardStore } from "@/context/card/CardStore";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { useTheme } from "next-themes";
import { EditorTabProps } from "../EditorWorkspace";

const tabFields = ["title", "description", "organization", "bio"];

export const TabAppearance = ({ isActive, form, setAlert }: EditorTabProps) => {
  const store = useCardStore();
  const { resolvedTheme } = useTheme();

  useWatchErrors({
    form,
    tabFields,
    tab: "appearance",
    setAlert,
  });

  const getDefaultSelected = () => {
    if (resolvedTheme === "dark" && store.settings.appearance === "dark") {
      return true;
    } else if (
      resolvedTheme === "light" &&
      store.settings.appearance === "light"
    ) {
      return false;
    } else if (resolvedTheme === "dark" && !store.settings.appearance) {
      return true;
    } else if (resolvedTheme === "light" && !store.settings.appearance) {
      return false;
    }
  };

  return (
    <PanelHeader
      isActive={isActive}
      title="Card Appearance"
      description="Customize the colors and appearance of your card"
    >
      <SwitchCard
        title="Dark Mode"
        description="Enable dark mode for your card"
        defaultChecked={getDefaultSelected()}
        onCheckedChange={(value) => {
          form.setValue("settings.showContactButton", value);
          store.setAppearance(value ? "dark" : "light");
        }}
      />
    </PanelHeader>
  );
};
