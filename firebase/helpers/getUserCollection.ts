import { collection } from "firebase/firestore";
import { db } from "../firebaseApp";

export async function getUserCollection() {
  const userCollection = collection(db, "user");
  return userCollection;
}
