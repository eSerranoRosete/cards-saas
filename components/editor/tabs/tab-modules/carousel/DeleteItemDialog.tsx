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

type Props = {
  itemID: string;
};

export default function DeleteItemDialog({ itemID }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const onDelete = async () => {
    try {
      toast.set({
        title: "Item deleted",
        message: "The item has been deleted successfully",
        variant: "success",
      });

      setLoading(false);
      onClose();
    } catch (error) {
      toast.set({
        title: "Error",
        message: "The item could not be deleted",
        variant: "error",
      });

      setLoading(false);
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
                  isLoading={loading}
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
