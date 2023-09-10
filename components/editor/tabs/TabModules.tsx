import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { EditorTabProps } from "../EditorWorkspace";
import { Textarea } from "@nextui-org/input";
import { useCardStore } from "@/context/card/useCardStore";
import { useWatchErrors } from "@/hooks/useWatchErrors";
import { Card } from "@nextui-org/card";
import CarouselDialog from "@/components/card-modules/carousel/CarouselDialog";

const tabFields = ["modules.bio"];

export const TabModules = ({ isActive, form, setAlert }: EditorTabProps) => {
  const { actions } = useCardStore();

  useWatchErrors({
    form,
    tabFields,
    tab: "modules",
    setAlert,
  });

  return (
    <PanelHeader
      isActive={isActive}
      title="Modules"
      description="Add modules to your card"
    >
      <form className="grid gap-4">
        <Textarea
          size="sm"
          label="Bio:"
          placeholder="Ex. I am a software engineer, I love to code and build things."
          {...form.register("modules.bio")}
          errorMessage={form.formState.errors.title?.message}
          onValueChange={(value) =>
            actions.setState({ modules: { bio: value } })
          }
        />
      </form>
      <CarouselDialog />
    </PanelHeader>
  );
};
