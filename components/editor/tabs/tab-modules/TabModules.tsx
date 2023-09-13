import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../../EditorWorkspace";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { EditItemDialog } from "./carousel/EditItemDialog";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import DeleteItemDialog from "./carousel/DeleteItemDialog";
import { useCardStore } from "@/context/card/CardStore";

export const TabModules = ({ isActive }: EditorTabProps) => {
  const store = useCardStore();

  return (
    <PanelHeader
      isActive={isActive}
      title="Modules"
      description="Add modules to your card"
    >
      <div className="grid gap-4">
        <Accordion className="p-0" variant="splitted">
          <AccordionItem
            key="carousel"
            title="Card Carousel"
            subtitle="See an manage items in your carousel"
            className="bg-transparent relative"
          >
            <ScrollShadow hideScrollBar className="w-full h-72 bg-transparent">
              {store.modules.carousel?.map((item, i) => (
                <EditItemDialog
                  key={i}
                  item={item}
                  trigger={(trigger) => (
                    <Card
                      isPressable
                      onPress={trigger}
                      className="p-2 w-full mb-2 flex items-center flex-row gap-3"
                    >
                      <Image
                        removeWrapper
                        className="aspect-square w-24 object-cover"
                        src={item.img.url}
                      />
                      <div className="text-left">
                        <p className="font-semibold w-full inline-block ">
                          {item.title}
                        </p>
                        <p className="text-sm text-default-500">
                          {item.description}
                        </p>
                      </div>
                      {!item.title && !item.description && (
                        <p className="text-sm text-default-500">
                          No title or description
                        </p>
                      )}
                      <DeleteItemDialog itemID={item.id} />
                    </Card>
                  )}
                />
              ))}
            </ScrollShadow>
            <EditItemDialog
              trigger={(trigger) => (
                <Button
                  size="md"
                  color="primary"
                  className="absolute right-2 bottom-2"
                  isIconOnly
                  onClick={trigger}
                >
                  <Plus className="w-5" />
                </Button>
              )}
            />
          </AccordionItem>
        </Accordion>
      </div>
    </PanelHeader>
  );
};
