"use client";

import { EditorTabs } from "@/types/EditorTypes";
import { Divider } from "@nextui-org/divider";
import {
  AtSign,
  Cog,
  Contact,
  LayoutPanelLeft,
  List,
  Save,
} from "lucide-react";
import { TabBasicDetails } from "./tabs/TabBasicDetails";
import { TabContactDetails } from "./tabs/TabContactDetails";
import { Toolbar, ToolbarItem } from "../application/toolbar/Toolbar";
import { useTabs } from "@/hooks/useTabs";
import { CardProvider } from "@/context/card/CardProvider";
import { CardType } from "@/server/card/CardTypes";
import { AppButton } from "../application/AppButton";
import { useCardStore } from "@/context/card/useCardStore";

import { UseFormReturn, useForm } from "react-hook-form";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useToast } from "../application/useToast";
import { useToolbarAlerts } from "@/hooks/useToolbarAlerts";

export type EditorTabProps = {
  isActive?: boolean;
  form: UseFormReturn<EditorFormValues, any, undefined>;
  hasAlert?: boolean;
  setAlert?: (tab: EditorTabs, value: boolean) => void;
};

const toolbarItems: ToolbarItem<EditorTabs>[] = [
  {
    tab: "basic",
    tooltip: "Basic Details",
    icon: <List />,
  },
  {
    tab: "contact",
    tooltip: "Contact Details",
    icon: <Contact />,
  },
  {
    tab: "modules",
    tooltip: "Modules",
    icon: <LayoutPanelLeft />,
  },
  {
    tab: "social",
    tooltip: "Social Links",
    icon: <AtSign />,
  },
  {
    tab: "settings",
    tooltip: "Settings",
    icon: <Cog />,
  },
];

export interface EditorFormValues extends CardType {}

export const EditorWorkspaceInner = () => {
  const { activeTab, setActiveTab } = useTabs({ items: toolbarItems });
  const { state, actions } = useCardStore();

  const toast = useToast();

  const { setAlert, hasAlert, alerts } = useToolbarAlerts(toolbarItems);

  const form = useForm<EditorFormValues>({
    defaultValues: {
      ...state,
    },
  });

  const onSubmit = (values: EditorFormValues) => {
    actions.setState({
      ...values,
    });

    toast.set({
      title: "Success!",
      message: "Changes to your card have been saved.",
      variant: "success",
    });
  };

  return (
    <div className="w-full flex gap-5 h-[calc(100vh-25vh)]">
      <Toolbar
        toolbarItems={toolbarItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alerts={alerts}
      />

      <Divider orientation="vertical" />

      <div className="w-full max-w-lg relative">
        <TabBasicDetails
          form={form}
          isActive={activeTab === "basic"}
          hasAlert={hasAlert("basic")}
          setAlert={setAlert}
        />

        <TabContactDetails
          form={form}
          isActive={activeTab === "contact"}
          hasAlert={hasAlert("contact")}
          setAlert={setAlert}
        />

        {/* <TabModules isActive={activeTab === "modules"} />

        <TabSocial isActive={activeTab === "social"} />

        <TabSettings isActive={activeTab === "settings"} /> */}

        <AppButton
          startContent={<Save className="w-4" />}
          className="bottom-0 right-0 absolute"
          color="primary"
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </AppButton>
      </div>
      <div className="w-full h-full bg-default-50 rounded-medium"></div>
    </div>
  );
};

type Props = {
  initialState?: CardType;
};

export const EditorWorkspace = ({ initialState }: Props) => {
  return (
    <CardProvider state={initialState}>
      <EditorWorkspaceInner />
    </CardProvider>
  );
};
