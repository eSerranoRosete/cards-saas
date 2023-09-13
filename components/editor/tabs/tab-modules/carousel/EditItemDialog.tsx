"use client";

import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import { CarouselItemForm } from "./CarouselItemForm";
import { CarouselItem } from "@/types/CardTypes";

type Props = {
  item?: CarouselItem;
  trigger: (onOpen: () => void) => JSX.Element;
};

export function EditItemDialog({ item, trigger }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {trigger(onOpen)}
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <CarouselItemForm
              onCancel={onClose}
              item={item}
              onSuccess={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
