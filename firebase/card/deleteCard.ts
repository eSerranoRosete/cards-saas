"use serve";

import { deleteDoc, doc } from "firebase/firestore";
import { getCardCollection } from "../helpers/getCardCollection";
import { revalidatePath } from "next/cache";

type Props = {
  id: string;
};

export async function deleteCard({ id }: Props) {
  const cardCollection = await getCardCollection();
  const docRef = doc(cardCollection, id);
  await deleteDoc(docRef);

  revalidatePath("/*");

  return docRef.id;
}
