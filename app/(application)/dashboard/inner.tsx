"use client";

import InitCardDialog from "@/components/InitCardDialog";
import { NoCardsBanner } from "@/components/NoCardsBanner";
import { PageHeader } from "@/components/application/PageHeader";

import { PlusCircle } from "lucide-react";
import { CardList } from "./CardList";
import { CardType } from "@/types/CardTypes";
import { Button } from "@radix-ui/themes";

type Props = {
  cards: CardType[];
};

export const Inner = ({ cards }: Props) => {
  return (
    <div>
      <PageHeader
        title="Your Active Cards"
        actions={
          <InitCardDialog
            button={
              <Button className="gap-2">
                <PlusCircle className="w-4" />
                Create Card
              </Button>
            }
          />
        }
      />
      {cards.length === 0 && <NoCardsBanner />}
      <CardList cards={cards} />
    </div>
  );
};
