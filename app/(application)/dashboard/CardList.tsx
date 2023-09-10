"use client";

import { CardType } from "@/types/CardTypes";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";

type Props = {
  cards: CardType[];
};

export const CardList = ({ cards }: Props) => {
  const router = useRouter();

  return (
    <section className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          radius="lg"
          className="border-none h-72"
          isPressable
          onPress={() => router.push(`/editor/${card.id}`)}
        >
          <Image
            alt={card.title}
            className="object-cover w-full h-full"
            removeWrapper
            src={card.avatar?.url}
          />
          <CardFooter className="p-2 bg-default-50 shadow-small px-4 absolute bottom-0 z-10">
            <div className="text-left">
              <p className="font-semibold text-lg">{card.title}</p>
              <p className="text-sm truncate">{card.description}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};
