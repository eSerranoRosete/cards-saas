import { PageHeader } from "@/components/application/PageHeader";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";

import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { CardProvider } from "@/context/card/CardStore";
import { getCard } from "@/firebase/card/getCard";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

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
            <Link href={`/card/${id}`} target="_blank">
              <Button className="gap-2">
                View Live Card
                <ExternalLink className="w-4" />
              </Button>
            </Link>
          </>
        }
      />
      <CardProvider initialState={card}>
        <EditorWorkspace cardID={card.id} />
      </CardProvider>
    </>
  );
}
