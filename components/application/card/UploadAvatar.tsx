import React from "react";
import UploadAssetDialog from "../UploadAssetDialog";
import { useIsLoading } from "@/hooks/useIsLoading";
import { UUID } from "@/lib/utils";
import { uploadAsset } from "@/firebase/card/uploadAsset";
import { updateCardAsset } from "@/firebase/card/updateCardAsset";
import { useToast } from "../toast/useToast";

type Props = {
  id: string;
  onColor?: (color: string) => void;
};

export const UploadAvatar = ({ id, onColor }: Props) => {
  const loader = useIsLoading();
  const toast = useToast();

  const onUpload = async (file: File, onClose?: () => void) => {
    loader.start();

    const id = UUID();
    const path = `/avatars/${id}.jpg`;
    const url = await uploadAsset({ file, path });

    const fileRecord = { id, url, path };

    await updateCardAsset({
      id,
      fileRecord,
      destination: "avatar",
    });

    loader.stop();

    toast.set({
      variant: "success",
      title: "Success!",
      message: "The image has been uploaded.",
    });
  };

  return (
    <UploadAssetDialog
      isLoading={loader.isLoading}
      onUpload={onUpload}
      onColor={onColor}
    />
  );
};
