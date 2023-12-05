"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Trash } from "lucide-react";

import { useIsLoading } from "@/hooks/useIsLoading";
import { AppButton } from "../application/AppButton";
import { ButtonProps } from "@nextui-org/button";
import { ReactNode } from "react";

type Props = {
  title: string;
  actionLabel?: string;
  children: React.ReactNode;
  trigger: (onClick: () => void) => ReactNode;
  onSuccess: () => void;
};

export default function DialogConfirm({
  title,
  actionLabel = "Confirm",
  children,
  trigger,
  onSuccess,
}: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const loader = useIsLoading();

  const onSuccessCb = async () => {
    loader.start();

    try {
      onSuccess();

      loader.stop();

      onClose();
    } catch (error: unknown) {
      loader.stop();
    }
  };
  return (
    <>
      {trigger(onOpen)}
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <AppButton
                  isLoading={loader.isLoading}
                  color="danger"
                  onPress={onSuccessCb}
                >
                  {actionLabel}
                </AppButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
