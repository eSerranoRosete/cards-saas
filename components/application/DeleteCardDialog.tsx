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

import { useToast } from "./toast/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppButton } from "./AppButton";
import { deleteCard } from "@/firebase/card/deleteCard";
import { useIsLoading } from "@/hooks/useIsLoading";

type Props = {
  cardID: string;
};

export default function DeleteCardDialog({ cardID }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const loader = useIsLoading();
  const router = useRouter();

  const toast = useToast();

  const onDelete = async () => {
    loader.start();

    try {
      await deleteCard({ id: cardID });

      toast.success({
        title: "Card deleted",
        message: "Your card has been deleted successfully",
      });

      loader.stop();
      router.push("/dashboard");

      onClose();
    } catch (error: unknown) {
      console.log(error);
      toast.error({
        title: "Error",
        message: error as string,
      });

      loader.stop();
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<Trash className="w-4" />}
        size="sm"
        variant="bordered"
        color="danger"
      >
        Delete Card
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
                card and all of its data.
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
