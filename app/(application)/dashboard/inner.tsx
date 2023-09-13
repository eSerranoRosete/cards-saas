"use client";

import InitCardDialog from "@/components/InitCardDialog";
import { NoCardsBanner } from "@/components/NoCardsBanner";
import { PageHeader } from "@/components/application/PageHeader";
import { Button } from "@nextui-org/button";
import { PlusCircle } from "lucide-react";
import { CardList } from "./CardList";
import { CardType } from "@/types/CardTypes";

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
            button={(onOpen) => (
              <Button
                onClick={onOpen}
                startContent={<PlusCircle className="w-4" />}
                size="md"
                color="primary"
              >
                Create Card
              </Button>
            )}
          />
        }
      />
      {cards.length === 0 && <NoCardsBanner />}
      <CardList cards={cards} />
    </div>
  );
};
