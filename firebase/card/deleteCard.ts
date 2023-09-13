"use server";

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { getCardCollection } from "../helpers/getCardCollection";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { CardType } from "@/types/CardTypes";

type Props = {
  id: string;
};

export async function deleteCard({ id }: Props) {
  const session = await getServerSession(options);

  if (!session?.user) return;

  const cardCollection = await getCardCollection();
  const docRef = doc(cardCollection, id);

  const docSnap = await getDoc(docRef);
  const card = docSnap.data() as CardType;

  if (card.owner !== session.user.id) return;

  await deleteDoc(docRef);
  revalidatePath("/*");
}
