import { PageHeader } from "@/components/application/PageHeader";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";

export default function EditorPage() {
  return (
    <>
      <PageHeader backLink="/dashboard" title="Editor" />
      <EditorWorkspace />
    </>
  );
}
