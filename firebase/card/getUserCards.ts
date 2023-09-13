"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { FirebaseResponse } from "../types";
import { CardType } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { getDocs, query, where } from "firebase/firestore";

export async function getUserCards(): Promise<FirebaseResponse<CardType[]>> {
  const session = await getServerSession(options);

  if (!session?.user) return { error: "No session found" };

  const { id } = session.user;

  const cardCollection = await getCardCollection();

  const q = query(cardCollection, where("owner", "==", id));

  const docArray = await getDocs(q);

  const doc = docArray.docs;

  const cardArray: CardType[] = doc.map((doc) => doc.data() as CardType);

  return {
    data: cardArray,
  };
}
