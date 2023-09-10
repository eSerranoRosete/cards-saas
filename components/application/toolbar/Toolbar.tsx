import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

export type ToolbarItem<T> = {
  tab: T;
  icon: JSX.Element;
  tooltip?: string;
  hasAlert?: boolean;
};

type Props<T> = {
  toolbarItems: ToolbarItem<T>[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
};

export function Toolbar<T>({
  toolbarItems,
  activeTab,
  setActiveTab,
}: Props<T>) {
  return (
    <div className="h-full flex flex-col gap-4">
      {toolbarItems.map((item) => (
        <Tooltip
          key={item.tab as any}
          content={item.tooltip}
          placement="right"
          color="primary"
          closeDelay={0}
          delay={500}
          hidden={!item.tooltip}
        >
          <div className="relative">
            <Button
              variant={activeTab === item.tab ? "solid" : "flat"}
              color={activeTab === item.tab ? "primary" : "default"}
              isIconOnly
              onClick={() => setActiveTab(item.tab)}
            >
              {item.icon}
            </Button>
            {item.hasAlert && (
              <div className="w-3 h-3 absolute -top-1 -right-1 rounded-full bg-danger" />
            )}
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
