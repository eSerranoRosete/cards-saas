import { SwitchCard } from "@/components/application/SwitchCard";
import { TextInput } from "@/components/application/form/TextInput";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { useCardStore } from "@/context/card/CardStore";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { EditorTabProps } from "../EditorWorkspace";

const tabFields = ["email", "phone"];

export const TabContactDetails = ({
  isActive,
  form,
  setAlert,
}: EditorTabProps) => {
  const store = useCardStore();

  useWatchErrors({
    form,
    tabFields,
    tab: "contact",
    setAlert,
  });

  return (
    <PanelHeader
      isActive={isActive}
      title="Contact Details"
      description="Fill in the contact details of your card"
    >
      <form className="grid gap-4">
        <TextInput
          label="Contact Email"
          placeholder="Ex. example@example.com"
          {...form.register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email",
            },
          })}
          errorMessage={form.formState.errors.email?.message}
          onChange={(e) => store.setEmail(e.target.value)}
        />

        <TextInput
          label="Contact Phone"
          placeholder="Ex. +52 55 5555 5555"
          {...form.register("phone")}
          errorMessage={form.formState.errors.phone?.message}
          onChange={(e) => store.setPhone(e.target.value)}
        />

        <SwitchCard
          title="Contact Button"
          description="Show a button to allow users to contact you"
          defaultChecked={form.getValues("settings.showContactButton")}
          onCheckedChange={(value) => {
            form.setValue("settings.showContactButton", value);
            store.setShowContact(value);
          }}
        />
        <SwitchCard
          title="Share Button"
          description="Show a button to allow users to share your card"
          defaultChecked={form.getValues("settings.showShareButton")}
          onCheckedChange={(value) => {
            form.setValue("settings.showShareButton", value);
            store.setShowShare(value);
          }}
        />
      </form>
    </PanelHeader>
  );
};
