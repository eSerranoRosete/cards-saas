"use server";

import { CardType, FileRecord } from "@/types/CardTypes";
import { getCardCollection } from "../helpers/getCardCollection";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebaseApp";

type Props = {
  cardID: string;
  fileRecord: FileRecord;
  destination: keyof Pick<CardType, "avatar" | "cover">;
};

export async function updateCardAsset({
  cardID,
  fileRecord,
  destination,
}: Props): Promise<string | null> {
  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection, cardID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists) return null;

  const docData = docSnap.data();

  if (docData) {
    const oldFileRecord = docData[destination] as FileRecord | undefined;

    if (oldFileRecord) {
      const oldFileRef = ref(storage, oldFileRecord.path);
      await deleteObject(oldFileRef);
    }
  }

  await updateDoc(docRef, { [destination]: fileRecord });

  return docRef.id;
}
