"use client";

import NextLink from "next/link";
import { EditorTabs } from "@/types/EditorTypes";
import { Divider } from "@nextui-org/divider";
import {
  AtSign,
  Cog,
  Contact,
  LayoutPanelLeft,
  List,
  Palette,
  Save,
} from "lucide-react";
import { TabBasicDetails } from "./tabs/TabBasicDetails";
import { TabContactDetails } from "./tabs/TabContactDetails";
import { Toolbar, ToolbarItem } from "../application/toolbar/Toolbar";
import { useTabs } from "@/hooks/useTabs";

import { EditableCard } from "@/types/CardTypes";
import { AppButton } from "../application/AppButton";

import { UseFormReturn, useForm } from "react-hook-form";

import { useToast } from "../application/toast/useToast";

import { useWithAlerts } from "@/hooks/useWithAlerts";
import { TabModules } from "./tabs/tab-modules/TabModules";
import { TabSocial } from "./tabs/TabSocial";
import { TabSettings } from "./tabs/TabSettings";

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { CardTemplateModern } from "../application/card/CardTemplateModern";
import { useCardStore } from "@/context/card/CardStore";
import { createCard } from "@/firebase/card/createCard";
import { useRouter } from "next/navigation";
import { updateCard } from "@/firebase/card/updateCard";
import { card } from "@nextui-org/react";
import { TabAppearance } from "./tabs/TabAppearance";
import { cn } from "@/lib/utils";

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
    tab: "appearance",
    tooltip: "Appearance",
    icon: <Palette />,
  },
  {
    tab: "settings",
    tooltip: "Settings",
    icon: <Cog />,
  },
];

export interface EditorFormValues extends EditableCard {}

type Props = {
  cardID?: string;
};

export const EditorWorkspace = ({ cardID }: Props) => {
  const { activeTab, setActiveTab } = useTabs({ items: toolbarItems });
  const store = useCardStore();
  const router = useRouter();

  const toast = useToast();

  const form = useForm<EditorFormValues>({
    defaultValues: {
      ...store.getState(),
    },
  });

  const { setAlert, items } = useWithAlerts(toolbarItems);

  const onSubmit = async (values: EditorFormValues) => {
    const state = store.getState();

    try {
      if (!cardID) {
        const cardID = await createCard({ data: state });
        toast.success({
          title: "Success!",
          message: "Your card has been created.",
        });
        router.push(`/editor/${cardID}`);
      } else {
        await updateCard({ data: state, id: cardID });
        toast.success({
          title: "Success!",
          message: "Your card has been updated.",
        });
      }
    } catch (error) {
      toast.error({
        title: "Error!",
        message: "Something went wrong.",
      });
    }
  };

  const onClick = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      form.handleSubmit(onSubmit)();
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
          cardID={cardID}
          form={form}
          isActive={activeTab === "modules"}
          setAlert={setAlert}
        />

        <TabSocial
          form={form}
          isActive={activeTab === "social"}
          setAlert={setAlert}
        />

        <TabAppearance
          form={form}
          isActive={activeTab === "appearance"}
          setAlert={setAlert}
        />

        <TabSettings
          form={form}
          isActive={activeTab === "settings"}
          setAlert={setAlert}
          cardID={cardID}
        />

        <div className="bottom-0 flex items-center gap-2 right-0 absolute">
          <Button variant="flat" as={NextLink} href="/dashboard">
            Cancel
          </Button>

          <AppButton
            startContent={<Save className="w-4" />}
            color="primary"
            onClick={onClick}
            isLoading={form.formState.isSubmitting}
          >
            Save
          </AppButton>
        </div>
      </div>
      <main
        className={cn(
          "w-full h-full bg-default-50 p-4 rounded-medium overflow-hidden",
          store.settings.appearance === "dark" ? "dark" : "light"
        )}
      >
        <div className="h-full overflow-y-auto">
          <CardTemplateModern cardID={cardID} view="edit" />
        </div>
      </main>
    </div>
  );
};
