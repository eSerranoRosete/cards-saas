"use client";

import DialogConfirm from "@/components/Dialogs/DialogConfirm";
import { useToast } from "@/components/application/toast/useToast";
import { useCardStore } from "@/context/card/CardStore";
import { updateCardCarousel } from "@/firebase/card/carousel/updateCardCarousel";
import { useIsLoading } from "@/hooks/useIsLoading";
import { useIsOpen } from "@/hooks/useIsOpen";
import { deleteCarouselItem } from "@/lib/array-mutations/carousel";
import { IconButton } from "@radix-ui/themes";
import { Trash } from "lucide-react";

type Props = {
  itemID: string;
  cardID: string;
};

export default function DeleteItemDialog({ itemID, cardID }: Props) {
  const { onClose } = useIsOpen();
  const loader = useIsLoading();

  const store = useCardStore();

  const toast = useToast();

  const onDelete = async () => {
    loader.start();

    try {
      const newItems = deleteCarouselItem({
        items: store.modules.carousel,
        id: itemID,
      });

      await updateCardCarousel({
        cardID,
        carousel: newItems,
      });

      store.setCarousel(newItems);

      toast.set({
        title: "Item deleted",
        message: "The item has been deleted successfully",
        variant: "success",
      });

      loader.stop();
      onClose();
    } catch (error) {
      toast.set({
        title: "Error",
        message: "The item could not be deleted",
        variant: "error",
      });
      loader.stop();
    }
  };

  return (
    <DialogConfirm
      stopProppagation
      title="Are you absolutely sure?"
      onSuccess={onDelete}
      trigger={
        <IconButton
          color="red"
          variant="soft"
          className="absolute top-0 right-0"
        >
          <Trash className="w-4" />
        </IconButton>
      }
    >
      This action cannot be undone. This will permanently delete the item and
      all of its data.
    </DialogConfirm>
  );
}
