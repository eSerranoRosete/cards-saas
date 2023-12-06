"use client";

import ColorThief from "colorthief";

import { useIsOpen } from "@/hooks/useIsOpen";

import { Dialog, IconButton } from "@radix-ui/themes";
import { Loader2, PlusIcon, UploadCloud } from "lucide-react";

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
  const { isOpen, onOpenChange, onClose } = useIsOpen();

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <IconButton>
          <UploadCloud className="w-4" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <div className="p-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-default border-dashed rounded-lg cursor-pointer"
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {!isLoading && (
                <>
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
        <Dialog.Close className="absolute top-3 right-3">
          <IconButton color="gray" variant="ghost" className="IconButton">
            <PlusIcon className="rotate-45" />
          </IconButton>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
