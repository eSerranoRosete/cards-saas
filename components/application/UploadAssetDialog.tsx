"use client";

import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import ColorThief from "colorthief";

import { Button } from "@nextui-org/button";
import { UploadCloud } from "lucide-react";
import { Spinner } from "@nextui-org/spinner";
import { processBase64 } from "@/lib/processBase64";

export type OnUploadProps = (file: File, onClose?: () => void) => void;

type Props = {
  isLoading?: boolean;
  onUpload?: (file: File, onClose?: () => void) => void;
  onBase64?: (base64: string) => void;
  onColor?: (color: string) => void;
};

export default function UploadAssetDialog({
  isLoading,
  onUpload,
  onBase64,
  onColor,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                  {isLoading && <Spinner label="Uploading Image" />}
                  {!isLoading && (
                    <>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-2" />
                        <p className="mb-2 text-sm text-default-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
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
                            onUpload && onUpload(file, onClose);

                            if (onBase64 || onColor) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64 = event.target?.result as string;

                                if (base64) onBase64?.(base64);

                                if (onColor) {
                                  const img = new Image();

                                  img.onload = () => {
                                    const colorThief = new ColorThief();
                                    const c = colorThief.getColor(img);

                                    const rbgString = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

                                    onColor && onColor(rbgString);
                                  };

                                  img.src = event.target?.result as string;
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }
                        }}
                      />
                    </>
                  )}
                </label>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
