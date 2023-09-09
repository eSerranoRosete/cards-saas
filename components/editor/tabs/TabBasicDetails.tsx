"use client";

import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { Input } from "@nextui-org/input";
import { EditorTabProps } from "../EditorWorkspace";
import { useEffect } from "react";

export const TabBasicDetails = ({
  isActive,
  form,
  hasAlert,
  setAlert,
}: EditorTabProps) => {
  console.log("🔥", hasAlert);

  useEffect(() => {
    const {
      formState: { errors },
    } = form;

    if (errors.title || errors.description || errors.organization) {
      setAlert && setAlert("basic", true);
    }
  }, [form.formState.errors]);

  return (
    <PanelHeader
      isActive={isActive}
      title="Basic Details"
      description="Fill in the basic details of your card"
    >
      <form className="grid gap-4">
        <Input
          size="sm"
          type="text"
          label="Display Title"
          placeholder="Ex. Jhon Doe"
          {...form.register("title", {
            required: "Title is required",
          })}
          errorMessage={form.formState.errors.title?.message}
        />
        <Input
          size="sm"
          type="text"
          label="Display Description"
          placeholder="Ex. Software Engineer"
          {...form.register("description")}
        />
        <Input
          size="sm"
          type="text"
          label="Organization"
          placeholder="Ex. Google"
          {...form.register("organization")}
        />
      </form>
    </PanelHeader>
  );
};
