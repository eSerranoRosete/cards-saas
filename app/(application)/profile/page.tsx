"use client";

import { PageHeader } from "@/components/application/PageHeader";
import { Toolbar, ToolbarItem } from "@/components/application/toolbar/Toolbar";
import { Divider } from "@nextui-org/divider";
import { Lock, User, Wallet } from "lucide-react";
import { ProfileTabs } from "./(tabs)/Tabs";
import { useTabs } from "@/hooks/useTabs";

export type ProfileTab = "personal" | "billing" | "security";

const toolbarItems: ToolbarItem<ProfileTab>[] = [
  {
    tab: "personal",
    tooltip: "Account Information",
    icon: <User />,
  },
  {
    tab: "billing",
    tooltip: "Billing Information",
    icon: <Wallet />,
  },
  {
    tab: "security",
    tooltip: "Account Security",
    icon: <Lock />,
  },
];

export default function ProfilePage() {
  const { activeTab, setActiveTab } = useTabs({ items: toolbarItems });

  return (
    <>
      <PageHeader backLink="/dashboard" title="Your Profile" />
      <div className="w-full flex gap-5 h-[calc(100vh-25vh)]">
        <Toolbar<ProfileTab>
          toolbarItems={toolbarItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Divider orientation="vertical" />
        <div className="w-full max-w-lg relative">
          <ProfileTabs activeTab={activeTab} />
        </div>
      </div>
    </>
  );
}
