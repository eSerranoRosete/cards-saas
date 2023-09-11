"use server";

import { CardType } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";

type Props = {
  id: string;
  data: Partial<CardType>;
};

export async function updateCard({
  id,
  data,
}: Props): Promise<FirebaseResponse<string>> {
  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists) return { error: "Card does not exist" };

  await updateDoc(docRef, { ...data });

  return { data: docRef.id };
}
