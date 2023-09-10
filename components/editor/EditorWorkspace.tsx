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

import { useToast } from "../application/useToast";

import { useWithAlerts } from "@/hooks/useWithAlerts";
import { TabModules } from "./tabs/TabModules";
import { TabSocial } from "./tabs/TabSocial";
import { TabSettings } from "./tabs/TabSettings";
import { CardTemplate } from "./CardTemplate";
import { createCard } from "@/server/card/createCard";
import { updateCard } from "@/server/card/updateCard";
import { useRouter } from "next/navigation";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export type EditorTabProps = {
  isActive?: boolean;
  form: UseFormReturn<EditorFormValues, any, undefined>;
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

  const router = useRouter();

  const toast = useToast();

  const form = useForm<EditorFormValues>({
    defaultValues: {
      ...state,
    },
  });

  const { setAlert, items } = useWithAlerts(toolbarItems);

  const onSubmit = async (values: EditorFormValues) => {
    actions.setState({
      ...values,
    });

    try {
      if (!values.id) {
        console.log("🔥", state);

        const id = await createCard({ ...state });

        router.push(`/editor/${id}`);
      } else {
        await updateCard({ ...state });
      }

      toast.set({
        title: "Success!",
        message: "Changes to your card have been saved.",
        variant: "success",
      });
    } catch (error) {
      toast.set({
        title: "Error",
        message: "Changes to your card could not be saved.",
        variant: "error",
      });
    }
  };

  const onClick = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      form.handleSubmit(onSubmit)();
    } else {
      toast.set({
        title: "Changes not saved",
        message: "Check the form for errors.",
        variant: "error",
      });
    }
  };

  return (
    <div className="w-full flex gap-5 h-[calc(100vh-25vh)]">
      <Toolbar
        toolbarItems={items}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Divider orientation="vertical" />

      <div className="w-full max-w-lg relative">
        <TabBasicDetails
          form={form}
          isActive={activeTab === "basic"}
          setAlert={setAlert}
        />

        <TabContactDetails
          form={form}
          isActive={activeTab === "contact"}
          setAlert={setAlert}
        />

        <TabModules
          form={form}
          isActive={activeTab === "modules"}
          setAlert={setAlert}
        />

        <TabSocial
          form={form}
          isActive={activeTab === "social"}
          setAlert={setAlert}
        />

        <TabSettings
          form={form}
          isActive={activeTab === "settings"}
          setAlert={setAlert}
        />

        <AppButton
          startContent={<Save className="w-4" />}
          className="bottom-0 right-0 absolute"
          color="primary"
          onClick={onClick}
          isLoading={form.formState.isSubmitting}
        >
          Save
        </AppButton>
      </div>
      <div className="w-full h-full bg-default-50 p-4 rounded-medium overflow-hidden">
        <ScrollShadow size={5} className="h-full">
          <CardTemplate view="edit" />
        </ScrollShadow>
      </div>
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
