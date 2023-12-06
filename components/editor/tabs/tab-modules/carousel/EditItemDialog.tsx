import { Dialog } from "@radix-ui/themes";

import { CarouselItem } from "@/types/CardTypes";
import { CarouselItemForm } from "./CarouselItemForm";
import { useIsOpen } from "@/hooks/useIsOpen";

type Props = {
  cardID: string;
  item?: CarouselItem;
  trigger: JSX.Element;
};

export function EditItemDialog({ item, trigger, cardID }: Props) {
  const { isOpen, onOpenChange, onClose } = useIsOpen();

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title></Dialog.Title>
        <Dialog.Description>
          <CarouselItemForm cardID={cardID} item={item} onSuccess={onClose} />
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}
