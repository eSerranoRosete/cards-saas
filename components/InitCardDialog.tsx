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

import { useRouter } from "next/navigation";

import { useIsLoading } from "@/hooks/useIsLoading";
import { useToast } from "./application/toast/useToast";
import { AppButton } from "./application/AppButton";

import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { createCard } from "@/firebase/card/createCard";

type Props = {
  button: (onOpen: () => void) => JSX.Element;
};

type FormValues = {
  title: string;
};

export default function InitCardDialog({ button }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const loader = useIsLoading();
  const router = useRouter();

  const toast = useToast();

  const form = useForm<FormValues>();

  const onSubmit = async ({ title }: FormValues) => {
    loader.start();
    try {
      const cardID = await createCard({
        data: { title, settings: {}, modules: {} },
      });

      toast.success({
        title: "Card created",
        message: "Your card has been created successfully",
      });

      loader.stop();
      onClose();
      router.push(`/editor/${cardID}`);
    } catch (error: unknown) {
      toast.error({
        title: "Error",
        message: "An error occurred while creating your card",
      });
      loader.stop();
    }
  };

  const onCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      {button(onOpen)}

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Give your card a title
              </ModalHeader>
              <ModalBody>
                <Input
                  size="sm"
                  label="Title"
                  placeholder="Ex. Jhon Doe's Card"
                  description="Don't worry, you can change this later"
                  errorMessage={form.formState.errors.title?.message}
                  {...form.register("title", {
                    required: "A title is required",
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onCancel}>
                  Cancel
                </Button>
                <AppButton
                  isLoading={loader.isLoading}
                  color="primary"
                  type="submit"
                >
                  Go to Editor
                </AppButton>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
