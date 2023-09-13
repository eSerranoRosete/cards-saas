"use client";

import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { Input, Textarea } from "@nextui-org/input";
import { EditorTabProps } from "../EditorWorkspace";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { useCardStore } from "@/context/card/CardStore";

const tabFields = ["title", "description", "organization", "bio"];

export const TabBasicDetails = ({
  isActive,
  form,
  setAlert,
}: EditorTabProps) => {
  const store = useCardStore();

  useWatchErrors({
    form,
    tabFields,
    tab: "basic",
    setAlert,
  });

  return (
    <PanelHeader
      isActive={isActive}
      title="Basic Details"
      description="Fill in the basic details of your card"
    >
      <form className="grid gap-4">
        <Input
          size="sm"
          label="Display Title"
          placeholder="Ex. Jhon Doe"
          {...form.register("title", {
            required: "Title is required",
          })}
          errorMessage={form.formState.errors.title?.message}
          onValueChange={(value) => store.setTitle(value)}
        />
        <Input
          size="sm"
          type="text"
          label="Display Description"
          placeholder="Ex. Software Engineer"
          {...form.register("description")}
          onValueChange={(value) => store.setDescription(value)}
        />
        <Input
          size="sm"
          type="text"
          label="Organization"
          placeholder="Ex. Google"
          {...form.register("organization")}
          onValueChange={(value) => store.setOrganization(value)}
        />
        <Textarea
          size="sm"
          label="Bio:"
          placeholder="Ex. I am a software engineer, I love to code and build things."
          {...form.register("bio")}
          errorMessage={form.formState.errors.bio?.message}
          onValueChange={(value) => store.setBio(value)}
        />
      </form>
    </PanelHeader>
  );
};
