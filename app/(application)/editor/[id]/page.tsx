import { PageHeader } from "@/components/application/PageHeader";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";
import { getSingleCard } from "@/server/card/getSingleCard";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditorPage({ params: { id } }: Props) {
  const card = await getSingleCard({ cardID: id });

  if (!card) notFound();

  return (
    <>
      <PageHeader backLink="/dashboard" title="Editor" />
      <EditorWorkspace initialState={card} />
    </>
  );
}
