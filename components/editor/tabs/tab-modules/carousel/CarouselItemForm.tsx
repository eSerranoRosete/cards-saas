import { AppButton } from "@/components/application/AppButton";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { CarouselItem } from "@/types/EditorTypes";
import { Input, Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/react";
import UploadAssetDialog from "@/components/application/UploadAssetDialog";
import { useState } from "react";
import { useCardStore } from "@/context/card/useCardStore";
import { updateCard } from "@/server/card/updateCard";
import { useToast } from "@/components/application/toast/useToast";
import { UUID } from "@/lib/utils";
import { updateCardModules } from "@/server/card/updateCardModules";
import { MediaFile } from "@/types/CardTypes";
import { processBase64 } from "@/lib/processBase64";
import { uploadCardMedia } from "@/server/card/uploadCardMedia";

type Props = {
  item?: CarouselItem;
  onCancel: () => void;
  onSuccess: () => void;
};

type FormValues = {
  title: string;
  description: string;
  img: string;
};

export const CarouselItemForm = ({ onCancel, item, onSuccess }: Props) => {
  const [imgSrc, setImgSrc] = useState(item?.img);
  const [loading, setLoading] = useState(false);

  const { state, actions } = useCardStore();

  const toast = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      title: item?.title,
      description: item?.description,
      img: item?.img,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!state.id) return;

    if (!imgSrc) {
      form.setError("img", {
        type: "manual",
        message: "An image is required",
      });
    } else {
      setLoading(true);

      const fileID = UUID();

      const file: MediaFile = {
        id: fileID,
        name: `${fileID}.jpg`,
        base64Content: processBase64(imgSrc),
      };

      const createdFileID = await uploadCardMedia({
        id: state.id,
        file,
        destination: "carouselImages",
        destinationIsArray: true,
      });

      const newItem: CarouselItem = {
        id: item?.id || UUID(),
        ...values,
      };
      let items = state.modules?.carousel || [];
      const exists = items.findIndex((i) => i.id === newItem.id);
      if (exists !== -1) {
        items[exists] = newItem;
      } else {
        items.push(newItem);
      }
      actions.setState({
        modules: {
          carousel: items,
        },
      });
      try {
        await updateCardModules({
          id: state.id,
          values: {
            ...state.modules,
            carousel: items,
          },
        });
        toast.set({
          variant: "success",
          title: "Success!",
          message: "Carousel item has been updated",
        });
        setLoading(false);
        onSuccess();
      } catch (error) {
        toast.set({
          variant: "error",
          title: "Error!",
          message: "Something went wrong, please try again",
        });
        setLoading(false);
      }
    }
  };

  const onImgUpload = (url: string) => {
    setImgSrc(url);
    form.clearErrors("img");
  };

  return (
    <form>
      <ModalHeader />
      <ModalBody className="grid gap-4">
        <Input
          size="sm"
          label="Title"
          placeholder="Ex. My Product"
          errorMessage={form.formState.errors.title?.message}
          {...form.register("title")}
        />
        <Textarea
          size="sm"
          label="Description"
          placeholder="Ex. This is my product."
          errorMessage={form.formState.errors.title?.message}
          {...form.register("description")}
        />
        <div className="w-full relative min-h-[60px] max-h-60 bg-default-100 rounded-medium">
          <p className="absolute w-full text-center top-1/2 -translate-y-1/2 text-sm text-default-500">
            Upload an image
          </p>
          <div className="absolute z-20 right-2 top-2">
            <UploadAssetDialog onSuccess={onImgUpload} />
          </div>
          <Image
            removeWrapper
            className="w-full h-full object-cover"
            src={imgSrc}
          />

          <p className="text-danger mt-2 text-sm">
            {form.formState.errors.img?.message}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <AppButton
          type="submit"
          color="primary"
          onClick={form.handleSubmit(onSubmit)}
          isLoading={loading}
        >
          Save
        </AppButton>
      </ModalFooter>
    </form>
  );
};
