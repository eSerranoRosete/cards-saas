"use server";

import { EditableCard } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";
import { revalidatePath } from "next/cache";

type Props = {
  id: string;
  data: EditableCard;
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

  revalidatePath("/editor/*");

  return { data: docRef.id };
}
