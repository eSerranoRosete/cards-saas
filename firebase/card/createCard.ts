"use server";

import { EditableCard } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, setDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

type Props = {
  data: EditableCard;
};

export async function createCard({ data }: Props): Promise<string> {
  const session = await getServerSession(options);

  if (!session) throw new Error("Unauthorized");

  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection);

  await setDoc(docRef, {
    ...data,
    id: docRef.id,
    owner: session.user.id,
  });

  revalidatePath("/dashboard/*");

  return docRef.id;
}
