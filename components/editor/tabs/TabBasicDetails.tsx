"use client";

import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { Input } from "@nextui-org/input";
import { EditorTabProps } from "../EditorWorkspace";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { useCardStore } from "@/context/card/useCardStore";

const tabFields = ["title", "description", "organization"];

export const TabBasicDetails = ({
  isActive,
  form,
  setAlert,
}: EditorTabProps) => {
  const { actions } = useCardStore();

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
          onValueChange={(value) => actions.setState({ title: value })}
        />
        <Input
          size="sm"
          type="text"
          label="Display Description"
          placeholder="Ex. Software Engineer"
          {...form.register("description")}
          onValueChange={(value) => actions.setState({ description: value })}
        />
        <Input
          size="sm"
          type="text"
          label="Organization"
          placeholder="Ex. Google"
          {...form.register("organization")}
          onValueChange={(value) => actions.setState({ organization: value })}
        />
      </form>
    </PanelHeader>
  );
};
