import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../../EditorWorkspace";
import { Textarea } from "@nextui-org/input";
import { useCardStore } from "@/context/card/useCardStore";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import { EditItemDialog } from "./carousel/EditItemDialog";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import DeleteItemDialog from "./carousel/DeleteItemDialog";

const tabFields = ["modules.bio"];

export const TabModules = ({ isActive, form, setAlert }: EditorTabProps) => {
  const { state, actions } = useCardStore();

  useWatchErrors({
    form,
    tabFields,
    tab: "modules",
    setAlert,
  });

  return (
    <PanelHeader
      isActive={isActive}
      title="Modules"
      description="Add modules to your card"
    >
      <div className="grid gap-4">
        <form className="grid gap-4">
          <Textarea
            size="sm"
            label="Bio:"
            placeholder="Ex. I am a software engineer, I love to code and build things."
            {...form.register("modules.bio")}
            errorMessage={form.formState.errors.title?.message}
            onValueChange={(value) =>
              actions.setState({ modules: { bio: value } })
            }
          />
        </form>

        <Accordion className="p-0" variant="splitted">
          <AccordionItem
            key="carousel"
            title="Card Carousel"
            subtitle="See an manage items in your carousel"
            className="bg-transparent relative"
          >
            <ScrollShadow hideScrollBar className="w-full h-72 bg-transparent">
              {state.modules?.carousel?.map((item, i) => (
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
                        src={item.img}
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
