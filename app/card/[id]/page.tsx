import { CardTemplateModern } from "@/components/application/card/CardTemplateModern";
import { CardProvider } from "@/context/card/CardStore";

import { getPublicCard } from "@/firebase/card/getPublicCard";

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
    <CardProvider initialState={card}>
      <CardTemplateModern view="preview" />
    </CardProvider>
  );
}
