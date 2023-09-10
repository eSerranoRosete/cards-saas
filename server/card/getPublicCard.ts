"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { CardType } from "../../types/CardTypes";

type Props = {
  cardID: string;
};

export const getPublicCard = async ({
  cardID,
}: Props): Promise<CardType | null> => {
  const session = await getServerSession(options);

  const xata = getXataClient();

  const card = await xata.db.card.filter("id", cardID).getFirst();

  // Return null if no card is found
  if (!card) return null;

  return card.toSerializable() as CardType;
};
