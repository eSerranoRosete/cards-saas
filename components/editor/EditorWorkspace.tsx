"use client";

import { useTabs } from "@/hooks/useTabs";
import { EditorTabs } from "@/types/EditorTypes";

import {
  AtSign,
  Cog,
  Contact,
  LayoutPanelLeft,
  List,
  Palette,
  Save,
} from "lucide-react";

import NextLink from "next/link";
import { Toolbar, ToolbarItem } from "../application/toolbar/Toolbar";
import { TabBasicDetails } from "./tabs/TabBasicDetails";
import { TabContactDetails } from "./tabs/TabContactDetails";

import { EditableCard } from "@/types/CardTypes";
import { AppButton } from "../application/AppButton";

import { UseFormReturn, useForm } from "react-hook-form";

import { useToast } from "../application/toast/useToast";

import { useWithAlerts } from "@/hooks/useWithAlerts";
import { TabSettings } from "./tabs/TabSettings";
import { TabSocial } from "./tabs/TabSocial";
import { TabModules } from "./tabs/tab-modules/TabModules";

import { useCardStore } from "@/context/card/CardStore";
import { createCard } from "@/firebase/card/createCard";
import { updateCard } from "@/firebase/card/updateCard";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { CardTemplateModern } from "../application/card/CardTemplateModern";
import { TabAppearance } from "./tabs/TabAppearance";
import { Button, Flex, Separator } from "@radix-ui/themes";
import Link from "next/link";

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

      <Separator size="4" orientation="vertical" />

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

        <Flex align="center" gap="2" className="bottom-0 right-0 absolute">
          <Link href="/dashboard">
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Link>

          <AppButton
            icon={<Save className="w-4" />}
            onClick={onClick}
            isLoading={form.formState.isSubmitting}
          >
            Save
          </AppButton>
        </Flex>
      </div>
      <main
        className={cn(
          "w-full h-full bg-default-50 p-4 rounded-medium overflow-hidden bg-zinc-900/20 rouded-large"
        )}
      >
        <div className="h-full overflow-y-auto">
          <CardTemplateModern cardID={cardID} view="edit" />
        </div>
      </main>
    </div>
  );
};
