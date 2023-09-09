import { PageHeader } from "@/components/application/PageHeader";
import { Button } from "@nextui-org/button";

import { PlusCircle } from "lucide-react";
import NextLink from "next/link";
import { CardList } from "./CardList";
import { getUserCards } from "@/server/card/getUserCards";

export default async function DashboardPage() {
  const cards = await getUserCards();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        actions={
          <Button
            as={NextLink}
            href="/editor"
            startContent={<PlusCircle className="w-4" />}
            size="md"
            color="primary"
          >
            Create Card
          </Button>
        }
      />
      <CardList cards={cards} />
    </div>
  );
}
