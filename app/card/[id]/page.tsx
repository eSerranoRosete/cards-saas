import { CardTemplateModern } from "@/components/application/card/CardTemplateModern";
import { CardProvider } from "@/context/card/CardProvider";
import { getPublicCard } from "@/server/card/getPublicCard";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const card = await getPublicCard({ cardID: params.id });

  if (!card) notFound();

  return (
    <CardProvider state={card}>
      <CardTemplateModern view="preview" />
    </CardProvider>
  );
}
