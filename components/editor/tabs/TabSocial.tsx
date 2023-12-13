import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { useCardStore } from "@/context/card/CardStore";
import { UUID } from "@/lib/utils";
import { SocialItem } from "@/types/CardTypes";
import { useForm } from "react-hook-form";
import { EditorTabProps } from "../EditorWorkspace";

import DialogConfirm from "@/components/Dialogs/DialogConfirm";
import { SocialIcon } from "@/components/social-icons/SocialIcon";
import { Card, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { Plus, Trash2 } from "lucide-react";

type FormValues = {
  url: string;
};

export const TabSocial = ({ isActive }: EditorTabProps) => {
  const store = useCardStore();

  const form = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    const social: SocialItem = {
      id: UUID(),
      url: values.url,
    };

    const currentSocial = store.social || [];

    store.setSocial([...currentSocial, social]);

    form.reset();
  };

  const deleteSocial = (id: string) => {
    const currentSocial = store.social || [];

    const newSocial = currentSocial.filter((item) => item.id !== id);

    store.setSocial(newSocial);
  };

  return (
    <PanelHeader
      isActive={isActive}
      title="Social"
      description="Add social links to your card"
    >
      <form className="flex items-start gap-2">
        <Flex direction="column" gap="3" className="w-full">
          <label>
            <Text as="div" size="1" mb="1" weight="bold">
              Enter a URL
            </Text>
            <TextField.Root>
              <TextField.Input
                size="3"
                variant="soft"
                color="gray"
                placeholder="Ex. https://twitter.com/username"
                {...form.register("url", {
                  required: "URL is required",
                })}
              />
              <TextField.Slot>
                <IconButton
                  onClick={form.handleSubmit(onSubmit)}
                  variant="soft"
                >
                  <Plus />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            {form.formState.errors.url && (
              <Text size="1" color="red">
                {form.formState.errors.url?.message}
              </Text>
            )}
          </label>
        </Flex>
      </form>
      <div className="mt-5 gap-2 grid">
        {store.social?.map((item) => (
          <Card key={item.id} className="max-w-lg">
            <div className="flex items-center gap-4">
              <SocialIcon size={45} url={item.url} />
              <Text className="flex-1 truncate text-sm">{item.url}</Text>
              <DialogConfirm
                trigger={
                  <IconButton color="red" variant="soft">
                    <Trash2 size={15} />
                  </IconButton>
                }
                onSuccess={() => deleteSocial(item.id)}
                title="Delete Social Link"
              >
                Are you sure you want to delete this social link? This action
                cannot be undone.
              </DialogConfirm>
            </div>
          </Card>
        ))}
      </div>
    </PanelHeader>
  );
};
