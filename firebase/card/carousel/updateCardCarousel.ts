"use server";

import { storage } from "@/firebase/firebaseApp";
import { getCardCollection } from "@/firebase/helpers/getCardCollection";
import { CardType, CarouselItem, FileRecord } from "@/types/CardTypes";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";

type Props = {
  cardID: string;
  carousel: CarouselItem[];
};

export async function updateCardCarousel({
  cardID,
  carousel,
}: Props): Promise<string | null> {
  const cardCollection = await getCardCollection();

  const docRef = doc(cardCollection, cardID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists) throw new Error("Card does not exist");

  const docData = docSnap.data() as CardType;

  if (docData) {
    const oldCarousel = docData.modules.carousel;

    if (oldCarousel) {
      const toDelete = compare(oldCarousel, carousel);

      console.log("🩵", toDelete);

      for (let i = 0; i < toDelete.length; i++) {
        const path = toDelete[i];
        const oldFileRef = ref(storage, path);
        await deleteObject(oldFileRef);
      }
    }
  }

  await updateDoc(docRef, {
    modules: {
      carousel,
    },
  });

  return docRef.id;
}

const compare = (
  oldCarousel: CarouselItem[],
  newCarousel: CarouselItem[]
): string[] => {
  const toDelete: string[] = [];

  const newIDs = newCarousel.map((item) => item.id);

  oldCarousel.forEach((oldItem) => {
    if (!newIDs.includes(oldItem.id)) {
      return toDelete.push(oldItem.img.path);
    }
  });

  newCarousel.forEach((newItem) => {
    const oldItem = oldCarousel.find((item) => item.id === newItem.id);

    if (oldItem) {
      if (oldItem.img.id !== newItem.img.id) {
        toDelete.push(oldItem.img.path);
      }
    }
  });

  return toDelete;
};
