"use client";

import { useRouter } from "next/navigation";

import { useIsLoading } from "@/hooks/useIsLoading";
import { useToast } from "./application/toast/useToast";

import { createCard } from "@/firebase/card/createCard";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { TextInput } from "./application/form/TextInput";

type Props = {
  button: JSX.Element;
};

type FormValues = {
  title: string;
};

export default function InitCardDialog({ button }: Props) {
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
      <Dialog.Trigger>{button}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Dialog.Title>Give your card a title</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Don't worry, you can change this later!
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
              <Button onClick={() => form.reset()} variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button type="submit">Go to Editor</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
