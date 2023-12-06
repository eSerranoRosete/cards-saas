import { useCardStore } from "@/context/card/CardStore";
import { Button, Card, Dialog, Flex, Text } from "@radix-ui/themes";
import { ChevronRight, Plus } from "lucide-react";
import React from "react";
import { EditItemDialog } from "./EditItemDialog";
import DeleteItemDialog from "./DeleteItemDialog";

type Props = {
  cardID: string;
};

export const CarouselDialog = ({ cardID }: Props) => {
  const store = useCardStore();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card className="cursor-pointer hover:opacity-80">
          <Flex align="center" justify="between">
            <Flex direction="column">
              <Text className="font-medium">Card Carousel</Text>

              <Text className="text-sm mb-5 text-default-400">
                See and manage items in your carousel
              </Text>
            </Flex>

            <ChevronRight />
          </Flex>
        </Card>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Card Carousel</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          See and manage items in your carousel
        </Dialog.Description>

        <div className="grid gap-4">
          <div className="w-full min-h-unit-8 max-h-96 pr-4 bg-transparent overflow-auto">
            {store.modules.carousel?.map((item, i) => (
              <EditItemDialog
                cardID={cardID}
                key={i}
                item={item}
                trigger={
                  <Card className="w-full mb-2 flex items-center flex-row gap-3">
                    <Flex align="center" gap="4">
                      <img
                        className="aspect-square w-32 object-cover rounded-lg"
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
                      <DeleteItemDialog cardID={cardID} itemID={item.id} />
                    </Flex>
                  </Card>
                }
              />
            ))}
          </div>
        </div>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
          <EditItemDialog
            cardID={cardID}
            trigger={
              <Button className="gap-2">
                <Plus className="w-5" />
                Add Item
              </Button>
            }
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
