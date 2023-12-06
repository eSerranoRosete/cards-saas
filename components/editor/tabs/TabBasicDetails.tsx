"use client";

import { TextAreaInput } from "@/components/application/form/TextAreaInput";
import { TextInput } from "@/components/application/form/TextInput";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { useCardStore } from "@/context/card/CardStore";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { EditorTabProps } from "../EditorWorkspace";

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
        <TextInput
          label="Display Title"
          placeholder="Ex. Jhon Doe"
          {...form.register("title", {
            required: "Title is required",
          })}
          onChange={(e) => store.setTitle(e.target.value)}
          errorMessage={form.formState.errors.title?.message}
        />

        <TextInput
          label="Description"
          placeholder="Ex. Software Engineer"
          {...form.register("description")}
          onChange={(e) => store.setDescription(e.target.value)}
          errorMessage={form.formState.errors.description?.message}
        />

        <TextInput
          label="Organization"
          placeholder="Ex. Google"
          {...form.register("organization")}
          onChange={(e) => store.setOrganization(e.target.value)}
          errorMessage={form.formState.errors.organization?.message}
        />

        <TextAreaInput
          label="Bio"
          placeholder="Ex. I am a software engineer, I love to code and build things."
          {...form.register("bio")}
          onChange={(e) => store.setBio(e.target.value)}
          errorMessage={form.formState.errors.bio?.message}
        />
      </form>
    </PanelHeader>
  );
};
