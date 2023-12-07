"use client";

import QrCode from "qrcode";

import { Image } from "@nextui-org/image";

import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useIsOpen } from "@/hooks/useIsOpen";

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
  const { isOpen, onOpen, onOpenChange, onClose } = useIsOpen();
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
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={openDialog} variant="soft" size="3" color="gray">
          Share this Card
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-xs">
        <div className="p-10 text-center">
          <img
            alt="Profile Image"
            className="w-16 h-16 rounded-large object-cover m-auto object-center rounded-lg"
            src={imgSrc}
          />
          <p className="text-xl font-bold mt-5">{title}</p>

          <Image className="m-auto mt-5" removeWrapper src={qrCode} />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
