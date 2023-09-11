import { collection } from "firebase/firestore";
import { db } from "..";

export async function getUserCollection() {
  const userCollection = collection(db, "user");
  return userCollection;
}
