import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../../EditorWorkspace";

import { useCardStore } from "@/context/card/CardStore";
import { Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { ChevronRight } from "lucide-react";
import { CarouselDialog } from "./carousel/CarouselDialog";

type Props = EditorTabProps & {
  cardID?: string;
};

export const TabModules = ({ isActive, cardID }: Props) => {
  const store = useCardStore();

  return (
    <PanelHeader
      isActive={isActive}
      title="Modules"
      description="Add modules to your card"
    >
      {cardID && <CarouselDialog cardID={cardID} />}
    </PanelHeader>
  );
};
