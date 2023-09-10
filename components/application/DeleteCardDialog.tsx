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
import { deleteCard } from "@/server/card/deleteCard";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppButton } from "./AppButton";

type Props = {
  cardID: string;
};

export default function DeleteCardDialog({ cardID }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toast = useToast();

  const onDelete = async () => {
    setLoading(true);

    try {
      await deleteCard({ cardID });

      toast.set({
        title: "Card deleted",
        message: "Your card has been deleted successfully",
        variant: "success",
      });

      router.push("/dashboard");

      setLoading(false);

      onClose();
    } catch (error) {
      toast.set({
        title: "Error",
        message: "Your card could not be deleted",
        variant: "error",
      });

      setLoading(false);
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
