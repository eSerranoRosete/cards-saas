"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";

import { useState } from "react";
import { useToast } from "@/components/application/toast/useToast";
import { AppButton } from "@/components/application/AppButton";
import { deleteCarouselItem } from "@/lib/array-mutations/carousel";
import { useCardStore } from "@/context/card/CardStore";
import { updateCardCarousel } from "@/firebase/card/carousel/updateCardCarousel";
import { useIsLoading } from "@/hooks/useIsLoading";

type Props = {
  itemID: string;
  cardID: string;
};

export default function DeleteItemDialog({ itemID, cardID }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
    <>
      <Button
        color="danger"
        variant="flat"
        className="absolute top-1 right-1"
        isIconOnly
        size="sm"
        onClick={onOpen}
      >
        <Trash className="w-3" />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you absolutely sure?
              </ModalHeader>
              <ModalBody>
                This action cannot be undone. This will permanently delete the
                item and all of its data.
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <AppButton
                  isLoading={loader.isLoading}
                  color="danger"
                  onPress={onDelete}
                >
                  Delete
                </AppButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
