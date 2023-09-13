import { PageHeader } from "@/components/application/PageHeader";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";
import { CardProvider } from "@/context/card/CardStore";

export default function EditorPage() {
  return (
    <>
      <PageHeader backLink="/dashboard" title="Editor" />
      <CardProvider>
        <EditorWorkspace />
      </CardProvider>
    </>
  );
}
