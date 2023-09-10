"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { CardType } from "../../types/CardTypes";

export const getUserCards = async (): Promise<CardType[]> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return [];
  }

  const { id } = session.user;

  const xata = getXataClient();

  const cards = await xata.db.card.filter("user.id", id).getMany();

  return cards.toSerializable() as CardType[];
};
