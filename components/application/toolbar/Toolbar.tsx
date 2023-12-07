import { IconButton } from "@radix-ui/themes";

export type ToolbarItem<T extends string> = {
  tab: T;
  icon: JSX.Element;
  tooltip?: string;
  hasAlert?: boolean;
};

type Props<T extends string> = {
  toolbarItems: ToolbarItem<T>[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
};

export function Toolbar<T extends string>({
  toolbarItems,
  activeTab,
  setActiveTab,
}: Props<T>) {
  return (
    <div className="h-full flex flex-col gap-4">
      {toolbarItems.map((item) => (
        <div key={item.tab} className="relative">
          <IconButton
            variant={activeTab === item.tab ? "solid" : "soft"}
            {...(activeTab !== item.tab && { color: "gray" })}
            onClick={() => setActiveTab(item.tab)}
            size="3"
          >
            {item.icon}
          </IconButton>
          {item.hasAlert && (
            <div className="w-3 h-3 absolute -top-1 -right-1 rounded-full bg-danger" />
          )}
        </div>
      ))}
    </div>
  );
}
