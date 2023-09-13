"use server";

import { CardType } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";
import { getServerSession } from "next-auth";

type Props = {
  data: Omit<CardType, "owner">;
};

export async function createCard({
  data,
}: Props): Promise<FirebaseResponse<string>> {
  const session = await getServerSession();

  if (!session) return { error: "No session found" };

  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection);

  await setDoc(docRef, {
    ...data,
    id: docRef.id,
    owner: session.user.id,
  });

  return {
    data: docRef.id,
  };
}
