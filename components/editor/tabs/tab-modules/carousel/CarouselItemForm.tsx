import { AppButton } from "@/components/application/AppButton";

import { useForm } from "react-hook-form";

import UploadAssetDialog from "@/components/application/UploadAssetDialog";
import { useState } from "react";

import { TextAreaInput } from "@/components/application/form/TextAreaInput";
import { TextInput } from "@/components/application/form/TextInput";
import { useToast } from "@/components/application/toast/useToast";
import { useCardStore } from "@/context/card/CardStore";
import { updateCardCarousel } from "@/firebase/card/carousel/updateCardCarousel";
import { uploadAsset } from "@/firebase/card/uploadAsset";
import { useIsLoading } from "@/hooks/useIsLoading";
import {
  addCarouselItem,
  updateCarouselItem,
} from "@/lib/array-mutations/carousel";
import { UUID } from "@/lib/utils";
import { CarouselItem, FileRecord } from "@/types/CardTypes";
import { Button, Dialog, Flex } from "@radix-ui/themes";

type Props = {
  item?: CarouselItem;
  cardID: string;
  onSuccess?: () => void;
};

type FormValues = {
  title: string;
  description: string;
  url: string;
  img: string;
};

export const CarouselItemForm = ({ item, cardID, onSuccess }: Props) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(item?.img.url);
  const [file, setFile] = useState<File>();

  const existing = item;

  const loader = useIsLoading();

  const toast = useToast();

  const store = useCardStore();

  const form = useForm<FormValues>({
    defaultValues: {
      title: item?.title,
      description: item?.description,
      img: item?.img.url,
      url: item?.url,
    },
  });

  const onSubmit = async ({ title, description, url: itemURL }: FormValues) => {
    if (!imgSrc) {
      form.setError("img", {
        message: "Image is required",
      });
      return;
    }

    loader.start();

    try {
      // If its a new item
      if (!existing && file) {
        const assetID = UUID();
        const path = buildCardAssetPath({ cardID, assetID });
        const url = await uploadAsset({ file, path });

        const record: FileRecord = {
          id: assetID,
          url,
          path,
        };

        const newItem: CarouselItem = {
          id: UUID(),
          title,
          description,
          img: record,
          url: itemURL,
        };

        const newItems = addCarouselItem({
          items: store.modules.carousel,
          newItem,
        });

        await updateCardCarousel({ cardID, carousel: newItems });
        store.setCarousel(newItems);
      }

      // If its an existing item without a new file
      if (existing && !file) {
        const newItem: CarouselItem = {
          id: existing.id,
          title,
          description,
          img: existing.img,
          url: itemURL,
        };

        const newItems = updateCarouselItem({
          items: store.modules.carousel,
          oldID: existing.id,
          newItem,
        });

        await updateCardCarousel({ cardID, carousel: newItems });
        store.setCarousel(newItems);
      }

      // If its an existing item with a new file
      if (existing && file) {
        const assetID = UUID();
        const path = buildCardAssetPath({ cardID, assetID });
        const url = await uploadAsset({ file, path });

        const record: FileRecord = {
          id: assetID,
          url,
          path,
        };

        const newItem: CarouselItem = {
          id: existing.id,
          title,
          description,
          img: record,
          url: itemURL,
        };

        const newItems = updateCarouselItem({
          items: store.modules.carousel,
          oldID: existing.id,
          newItem,
        });

        await updateCardCarousel({ cardID, carousel: newItems });
        store.setCarousel(newItems);
      }

      toast.success({ title: "Success!", message: "Carousel has been saved." });
      onSuccess?.();
      loader.stop();
    } catch (error) {
      toast.error({
        title: "Error!",
        message: "Something went wrong. Please try again.",
      });
      loader.stop();
    }
  };

  const onBase64 = (base64: string) => {
    setImgSrc(base64);
    form.clearErrors("img");
  };

  const onUpload = (file: File, close?: () => void) => {
    setFile(file);
    close?.();
  };

  return (
    <form>
      <Flex direction="column" gap="3" className="h-full" mb="4">
        <TextInput
          label="Title (optional)"
          placeholder="Ex. My Product"
          errorMessage={form.formState.errors.title?.message}
          {...form.register("title")}
        />
        <TextAreaInput
          label="Description (optional)"
          placeholder="Ex. This is my product."
          errorMessage={form.formState.errors.title?.message}
          {...form.register("description")}
        />
        <TextInput
          label="Url (optional)"
          placeholder="Ex. https://mystore.example"
          errorMessage={form.formState.errors.url?.message}
          {...form.register("url", {
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
              message: "Enter a valid url",
            },
          })}
        />
        <div className="w-full relative min-h-[60px] max-h-60 rounded-md">
          <p className="absolute w-full -z-10 text-center top-1/2 -translate-y-1/2 text-sm text-default-500">
            Upload an image
          </p>
          <div className="absolute z-20 right-2 top-2">
            <UploadAssetDialog onBase64={onBase64} onUpload={onUpload} />
          </div>

          <img
            className="w-full h-60 aspect-square object-cover rounded-md"
            src={imgSrc}
          />

          <p className="text-danger mt-2 text-sm">
            {form.formState.errors.img?.message}
          </p>
        </div>
      </Flex>

      <Flex align="center" gap="4" justify="end">
        <Dialog.Close>
          <Button variant="ghost" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <AppButton
          onClick={form.handleSubmit(onSubmit)}
          isLoading={loader.isLoading}
        >
          Save
        </AppButton>
      </Flex>
    </form>
  );
};

type CarouselAssetProps = {
  cardID: string;
  assetID: string;
};

export const buildCardAssetPath = ({ cardID, assetID }: CarouselAssetProps) => {
  return `/cards/${cardID}/assets/${assetID}.jpg`;
};
