"use server";

import { CardType } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";

type Props = {
  id: string;
};

export async function getCard({
  id,
}: Props): Promise<FirebaseResponse<CardType>> {
  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists) return { error: "Card does not exist" };

  return {
    data: docSnap.data() as CardType,
  };
}
