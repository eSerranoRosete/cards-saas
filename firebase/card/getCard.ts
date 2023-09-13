"use server";

import { CardType } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

type Props = {
  id: string;
};

export async function getCard({
  id,
}: Props): Promise<FirebaseResponse<CardType>> {
  const session = await getServerSession(options);

  if (!session) return { error: "User not authenticated" };

  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return { error: "Card does not exist" };

  const data = docSnap.data() as CardType;

  if (data.owner !== session.user.id) return { error: "User not authorized" };

  return {
    data: docSnap.data() as CardType,
  };
}
