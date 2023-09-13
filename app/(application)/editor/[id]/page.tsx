import { PageHeader } from "@/components/application/PageHeader";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";
import { Button } from "@nextui-org/button";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import NextLink from "next/link";
import { getCard } from "@/firebase/card/getCard";
import { CardProvider } from "@/context/card/CardStore";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditorPage({ params: { id } }: Props) {
  const { data: card } = await getCard({ id });

  if (!card) notFound();

  return (
    <>
      <PageHeader
        backLink="/dashboard"
        title="Editor"
        actions={
          <>
            <Button
              as={NextLink}
              href={`/card/${id}`}
              target="_blank"
              size="md"
              endContent={<ExternalLink className="w-4" />}
            >
              View Live Card
            </Button>
          </>
        }
      />
      <CardProvider initialState={card}>
        <EditorWorkspace cardID={card.id} />
      </CardProvider>
    </>
  );
}
