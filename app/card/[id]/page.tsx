import { CardTemplate } from "@/components/editor/CardTemplate";
import { CardProvider } from "@/context/card/CardProvider";
import { getSingleCard } from "@/server/card/getSingleCard";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const card = await getSingleCard({ cardID: params.id });

  if (!card) notFound();

  return (
    <CardProvider state={card}>
      <CardTemplate view="preview" />
    </CardProvider>
  );
}
