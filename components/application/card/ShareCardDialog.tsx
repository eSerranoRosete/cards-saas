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

import QrCode from "qrcode";

import { Image } from "@nextui-org/image";

import { useState } from "react";

import { motion } from "framer-motion";

type Props = {
  id?: string;
  imgSrc?: string;
  title?: string;
  disableModal?: boolean;
};

export default function ShareCardDialog({
  id,
  imgSrc,
  title,
  disableModal,
}: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [qrCode, setQrCode] = useState<string>();

  const generate = async () => {
    const url = `${window.location.origin}/card/${id}`;
    const qrCode = await QrCode.toDataURL(url);
    setQrCode(qrCode);
  };

  const openDialog = () => {
    if (disableModal) return;

    generate();
    onOpen();
  };

  return (
    <>
      <Button onClick={openDialog}>Share this Card</Button>

      <Modal
        backdrop="transparent"
        className="bg-black/70 h-3/4 backdrop-blur-md"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <ModalBody>
              <div className="p-10 text-center">
                <Image
                  alt="Profile Image"
                  className="w-16 h-16 rounded-large object-cover m-auto"
                  removeWrapper
                  src={imgSrc}
                />
                <p className="text-xl font-bold mt-5">{title}</p>

                <Image className="m-auto mt-5" removeWrapper src={qrCode} />
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
