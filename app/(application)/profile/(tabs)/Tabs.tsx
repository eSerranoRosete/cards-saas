import { ProfileTab } from "../page";
import { TabAccountInfo } from "./TabAccountInfo";
import { TabBillingInfo } from "./TabBillingInfo";
import { TabAccountSecurity } from "./TabAccountSecurity";

type Props = {
  activeTab: ProfileTab;
};

export const ProfileTabs = ({ activeTab }: Props) => {
  switch (activeTab) {
    case "personal":
      return <TabAccountInfo />;
    case "billing":
      return <TabBillingInfo />;
    case "security":
      return <TabAccountSecurity />;
    default:
      return <TabAccountInfo />;
  }
};
