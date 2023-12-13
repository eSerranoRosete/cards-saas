"use client";

import { useRouter } from "next/navigation";

import { useIsLoading } from "@/hooks/useIsLoading";
import { useToast } from "./application/toast/useToast";

import { createCard } from "@/firebase/card/createCard";
import { Dialog, Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { AppButton } from "./application/AppButton";
import { TextInput } from "./application/form/TextInput";
import { PlusCircle } from "lucide-react";

type Props = {};

type FormValues = {
  title: string;
};

export default function InitCardDialog({}: Props) {
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

      router.push(`/editor/${cardID}`);
    } catch (error: unknown) {
      toast.error({
        title: "Error",
        message: "An error occurred while creating your card",
      });
      loader.stop();
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AppButton icon={<PlusCircle className="w-4" />}>Create Card</AppButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <form>
          <Dialog.Title>Give your card a title</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Don&apos;t worry, you can change this later!
          </Dialog.Description>

          <TextInput
            label="Name"
            placeholder="Ex. Jhon Doe"
            {...form.register("title", {
              required: "A title is required",
            })}
            errorMessage={form.formState.errors.title?.message}
          />

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <AppButton
                onClick={() => form.reset()}
                variant="soft"
                color="gray"
              >
                Cancel
              </AppButton>
            </Dialog.Close>

            <AppButton onClick={form.handleSubmit(onSubmit)}>
              Go to Editor
            </AppButton>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
