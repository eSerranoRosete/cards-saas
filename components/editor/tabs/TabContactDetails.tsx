import { Input } from "@nextui-org/input";
import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { SwitchCard } from "@/components/application/SwitchCard";
import { EditorTabProps } from "../EditorWorkspace";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { useCardStore } from "@/context/card/CardStore";

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
        <Input
          size="sm"
          type="email"
          label="Contact Email"
          placeholder="Ex. example@example.com"
          {...form.register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email",
            },
          })}
          errorMessage={form.formState.errors.email?.message}
          onValueChange={(value) => store.setEmail(value)}
        />
        <Input
          size="sm"
          type="tel"
          label="Contact Phone"
          placeholder="Ex. +52 55 5555 5555"
          {...form.register("phone")}
          errorMessage={form.formState.errors.phone?.message}
          onValueChange={(value) => store.setPhone(value)}
        />
        <SwitchCard
          title="Contact Button"
          description="Show a button to allow users to contact you"
          defaultSelected={form.getValues("settings.showContactButton")}
          onValueChange={(value) => {
            form.setValue("settings.showContactButton", value);
            store.setShowContact(value);
          }}
        />
        <SwitchCard
          title="Share Button"
          description="Show a button to allow users to share your card"
          defaultSelected={form.getValues("settings.showShareButton")}
          onValueChange={(value) => {
            form.setValue("settings.showShareButton", value);
            store.setShowShare(value);
          }}
        />
      </form>
    </PanelHeader>
  );
};
