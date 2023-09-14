import { CardTemplateModern } from "@/components/application/card/CardTemplateModern";
import { CardProvider } from "@/context/card/CardStore";

import { getPublicCard } from "@/firebase/card/getPublicCard";
import { cn } from "@/lib/utils";

import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { data: card } = await getPublicCard({ id: params.id });

  if (!card) notFound();

  return (
    <main
      className={cn(
        card.settings.appearance === "dark" && "dark",
        card.settings.appearance === "light" && "light"
      )}
    >
      <CardProvider initialState={card}>
        <CardTemplateModern view="preview" cardID={card.id} />
      </CardProvider>
    </main>
  );
}
