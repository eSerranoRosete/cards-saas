import { collection } from "firebase/firestore";
import { db } from "..";

export async function getCardCollection() {
  const cardCollection = collection(db, "card");
  return cardCollection;
}
