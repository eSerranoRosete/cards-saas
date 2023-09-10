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
import { UploadCloud } from "lucide-react";

import Dropzone, { DropEvent } from "react-dropzone";
import { useCallback } from "react";

type Props = {
  onSuccess?: (imageString: string) => void;
};

export default function UploadAssetDialog({ onSuccess }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onDrop = (e: DropEvent) => {
    const file = e; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageString = event.target?.result; // This is the data URL representing the image

        if (imageString) {
          onSuccess?.(imageString as any); // Pass the data URL to onSuccess
          onClose();
        }
      };
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<UploadCloud className="w-4" />}
        isIconOnly
        color="primary"
      />
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div className="p-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-default border-dashed rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-2" />
                    <p className="mb-2 text-sm text-default-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-default-500">
                      SVG, PNG or JPG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Get the first selected file
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const imageString = event.target?.result; // This is the data URL representing the image

                          if (imageString) {
                            onSuccess && onSuccess(imageString as any); // Pass the data URL to onSuccess
                            onClose();
                          }
                        };
                        reader.readAsDataURL(file); // Read the file as a data URL
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
