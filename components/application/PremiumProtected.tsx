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
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function PremiumProtected({ children }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const session = useSession();

  const isPremium = true;

  return (
    <div className="relative">
      <div>
        {!isPremium && (
          <div
            onClick={onOpen}
            className="w-full cursor-pointer h-full absolute z-10"
          />
        )}

        {children}
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Upgrade to Premium</ModalHeader>
              <ModalBody>
                <p>
                  This feature is only available to premium users. Upgrade to
                  premium to use this feature.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button size="md" color="primary" onClick={onClose}>
                  Upgrade To Premium
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
