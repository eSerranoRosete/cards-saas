import { collection } from "firebase/firestore";
import { db } from "../firebaseApp";

export async function getCardCollection() {
  const cardCollection = collection(db, "card");
  return cardCollection;
}
