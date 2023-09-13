import { AppButton } from "@/components/application/AppButton";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";

import { Input, Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/react";
import UploadAssetDialog from "@/components/application/UploadAssetDialog";
import { useState } from "react";

import { CarouselItem } from "@/types/CardTypes";

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

  const form = useForm<FormValues>({
    defaultValues: {
      title: item?.title,
      description: item?.description,
      img: item?.img.url,
    },
  });

  const onSubmit = async () => {};

  const onImgUpload = () => {};

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
            <UploadAssetDialog onUpload={onImgUpload} />
          </div>
          <Image
            removeWrapper
            className="w-full h-full object-cover"
            src={imgSrc?.url}
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
