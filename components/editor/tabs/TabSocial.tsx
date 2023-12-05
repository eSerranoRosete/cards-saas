import { PanelHeader } from "@/components/application/panel/PanelHeader";
import React from "react";
import { EditorTabProps } from "../EditorWorkspace";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { useCardStore } from "@/context/card/CardStore";
import { UUID } from "@/lib/utils";
import { SocialItem } from "@/types/CardTypes";
import { Button } from "@nextui-org/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardBody } from "@nextui-org/card";
import { SocialIcon } from "@/components/social-icons/SocialIcon";
import DialogConfirm from "@/components/Dialogs/DialogConfirm";

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
      <form
        className="flex items-start gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          size="sm"
          label="Social URL"
          placeholder="Ex. https://twitter.com/username"
          {...form.register("url", {
            required: "URL is required",
          })}
          errorMessage={form.formState.errors.url?.message}
        />
        <Button
          type="submit"
          color="primary"
          isIconOnly
          startContent={<Plus />}
          size="md"
        />
      </form>
      <div className="mt-5 gap-2 grid">
        {store.social?.map((item) => (
          <Card>
            <CardBody className="p-3">
              <div className="flex items-center gap-4">
                <SocialIcon size={45} url={item.url} />
                <div className="flex-1 truncate text-sm">{item.url}</div>
                <DialogConfirm
                  trigger={(onClick) => (
                    <Button
                      isIconOnly
                      startContent={<Trash2 size={15} />}
                      size="sm"
                      color="danger"
                      variant="flat"
                      onClick={onClick}
                    />
                  )}
                  onSuccess={() => deleteSocial(item.id)}
                  title="Delete Social Link"
                >
                  Are you sure you want to delete this social link? This action
                  cannot be undone.
                </DialogConfirm>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </PanelHeader>
  );
};
