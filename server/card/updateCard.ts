"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardType } from "../../types/CardTypes";
import { uploadCardMedia } from "./uploadCardMedia";

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

  if (values.avatar?.base64Content) {
    await uploadCardMedia({
      id: currentCard.id,
      destinationIsArray: false,
      file: values.avatar,
      destination: "avatar",
    });
  }

  if (values.cover?.base64Content) {
    await uploadCardMedia({
      id: currentCard.id,
      destinationIsArray: false,
      file: values.cover,
      destination: "cover",
    });
  }

  delete values.avatar;
  delete values.cover;

  const card = await currentCard.update({
    ...values,
  });

  if (!card) {
    return null;
  }

  revalidatePath("/*");

  return card.id;
};
