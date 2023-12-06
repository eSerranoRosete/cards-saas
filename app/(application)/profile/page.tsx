"use client";

import { PageHeader } from "@/components/application/PageHeader";
import { Toolbar, ToolbarItem } from "@/components/application/toolbar/Toolbar";

import { Lock, User, Wallet } from "lucide-react";

import { useTabs } from "@/hooks/useTabs";
import { TabAccountInfo } from "./(tabs)/TabAccountInfo";
import { TabAccountSecurity } from "./(tabs)/TabAccountSecurity";
import { TabBillingInfo } from "./(tabs)/TabBillingInfo";
import { Separator } from "@radix-ui/themes";

export type ProfileTab = "personal" | "billing" | "security";

export type ProfileTabProps = {
  isActive?: boolean;
};

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
        <Separator size="4" orientation="vertical" />
        <div className="w-full max-w-lg relative">
          <TabAccountInfo isActive={activeTab === "personal"} />

          <TabBillingInfo isActive={activeTab === "billing"} />

          <TabAccountSecurity isActive={activeTab === "security"} />
        </div>
      </div>
    </>
  );
}
