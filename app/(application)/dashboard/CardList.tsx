"use client";

import { CardType } from "@/types/CardTypes";
import { useRouter } from "next/navigation";
import { CardContainer } from "./CardContainer";
import { Card, Inset, Text } from "@radix-ui/themes";

type Props = {
  cards: CardType[];
};

export const CardList = ({ cards }: Props) => {
  const router = useRouter();

  return (
    <CardContainer>
      {cards.map((card) => (
        <Card
          key={card.id}
          className="border-none h-72 cursor-pointer"
          onClick={() => router.push(`/editor/${card.id}`)}
        >
          <Inset clip="padding-box" side="top" pb="current">
            <img
              alt={card.title}
              className="object-cover w-full h-full"
              src={card.avatar?.url}
            />
          </Inset>
          <Text className="dark:bg-zinc-900 bg-zinc-100 shadow-small absolute bottom-0  left-0  p-4 z-10 w-full">
            <div className="text-left">
              <p className="font-semibold text-lg">{card.title}</p>
              <p className="text-sm truncate">{card.description}</p>
            </div>
          </Text>
        </Card>
      ))}
    </CardContainer>
  );
};
