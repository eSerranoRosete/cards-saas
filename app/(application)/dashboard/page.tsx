import { PageHeader } from "@/components/application/PageHeader";
import { Button } from "@nextui-org/button";

import { PlusCircle } from "lucide-react";
import NextLink from "next/link";
import { CardList } from "./CardList";
import { getUserCards } from "@/server/card/getUserCards";
import PremiumProtected from "@/components/application/PremiumProtected";
import { NoCardsBanner } from "@/components/NoCardsBanner";

export default async function DashboardPage() {
  const cards = await getUserCards();

  return (
    <div>
      <PageHeader
        title="Your Active Cards"
        actions={
          <PremiumProtected>
            <Button
              as={NextLink}
              href="/editor"
              startContent={<PlusCircle className="w-4" />}
              size="md"
              color="primary"
            >
              Create Card
            </Button>
          </PremiumProtected>
        }
      />
      {cards.length === 0 && <NoCardsBanner />}
      <CardList cards={cards} />
    </div>
  );
}
