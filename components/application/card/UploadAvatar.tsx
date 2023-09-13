import UploadAssetDialog from "../UploadAssetDialog";
import { useIsLoading } from "@/hooks/useIsLoading";
import { UUID } from "@/lib/utils";
import { uploadAsset } from "@/firebase/card/uploadAsset";
import { updateCardAsset } from "@/firebase/card/updateCardAsset";
import { useToast } from "../toast/useToast";
import { useCardStore } from "@/context/card/CardStore";
import { updateCard } from "@/firebase/card/updateCard";

type Props = {
  cardID: string;
};

export const UploadAvatar = ({ cardID }: Props) => {
  const store = useCardStore();

  const loader = useIsLoading();
  const toast = useToast();

  const onUpload = async (file: File, onClose?: () => void) => {
    loader.start();

    const id = UUID();
    const path = `/avatars/${id}.jpg`;
    const url = await uploadAsset({ file, path });

    const fileRecord = { id, url, path };

    await updateCardAsset({
      cardID,
      fileRecord,
      destination: "avatar",
    });

    store.setAvatar(fileRecord);

    loader.stop();

    onClose?.();

    toast.set({
      variant: "success",
      title: "Success!",
      message: "The image has been uploaded.",
    });
  };

  const onColor = (color: string) => {
    store.setDominantColor(color);
  };

  return (
    <UploadAssetDialog
      isLoading={loader.isLoading}
      onUpload={onUpload}
      onColor={onColor}
    />
  );
};
