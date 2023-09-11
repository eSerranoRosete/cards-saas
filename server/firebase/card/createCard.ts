"use server";

import { CardType } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";

type Props = {
  data: CardType;
};

export async function createCard({
  data,
}: Props): Promise<FirebaseResponse<string>> {
  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection);

  await setDoc(docRef, {
    ...data,
    id: docRef.id,
  });

  return {
    data: docRef.id,
  };
}
