"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardType } from "../../types/CardTypes";
import { processBase64 } from "@/lib/processBase64";

export const updateCard = async (values: CardType): Promise<string | null> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const xata = getXataClient();

  const currentCard = await xata.db.card.filter({ id: values.id }).getFirst();

  if (!currentCard?.user) {
    throw new Error("Card not found");
  }

  if (currentCard.user.id !== user.id) {
    throw new Error("You don't have permission to update this card");
  }

  values.avatar =
    processBase64(values.avatar?.base64Content) ||
    currentCard.avatar?.attributes;
  values.cover =
    processBase64(values.cover?.base64Content) || currentCard.cover?.attributes;

  const card = await xata.db.card.update(currentCard.id, {
    ...values,

    id: currentCard.id,
  });

  if (!card) {
    return null;
  }

  revalidatePath("/*");

  return card.id;
};
