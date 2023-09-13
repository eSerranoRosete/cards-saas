"use client";

import {
  Modal,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";

import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { AppButton } from "@/components/application/AppButton";
import { CardCarousel } from "@/components/application/card/CardCarousel";

type Props = {
  onSuccess?: (imageString: string) => void;
  onColor?: (color: string) => void;
};

export default function CarouselDialog({ onSuccess, onColor }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Card
        onPress={onOpen}
        isPressable
        className="p-2 w-full mt-5 text-center"
      >
        <div className="p-2 rounded-large border w-full border-default border-dotted">
          Carousel
          <div className="w-full grid grid-cols-3 gap-3 h-16 mt-4">
            <div className="bg-gradient-to-l from-default/20 to-transparent rounded-large" />
            <div className="bg-default/20 rounded-large" />
            <div className="bg-gradient-to-r from-default/20 to-transparent rounded-large" />
          </div>
        </div>
      </Card>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Carousel Component
              </ModalHeader>
              <ModalBody>
                <h1>No items yet.</h1>
                <div className="bg-default rounded-large p-4">
                  {/* <CardCarousel /> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <AppButton color="primary">Save</AppButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
