"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardType } from "../../types/CardTypes";

type Props = {
  id: string;
  values: Partial<CardType["modules"]>;
};

export const updateCardModules = async ({
  id,
  values,
}: Props): Promise<string | null> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const xata = getXataClient();

  const currentCard = await xata.db.card.filter({ id }).getFirst();

  if (!currentCard?.user) {
    throw new Error("Card not found");
  }

  if (currentCard.user.id !== user.id) {
    throw new Error("You don't have permission to update this card");
  }

  const card = await currentCard.update({
    modules: values,
  });

  if (!card) {
    return null;
  }

  revalidatePath("/*");

  return card.id;
};
