"use server";

import { getDocs, limit, query, where } from "firebase/firestore";
import { getUserCollection } from "../helpers/getUserCollection";
import { FirebaseResponse } from "../types";
import { UserType } from "@/types/UserTypes";

type Props = {
  email: string;
};

export async function getUserByEmail({
  email,
}: Props): Promise<FirebaseResponse<UserType>> {
  const userCollection = await getUserCollection();

  const q = query(userCollection, where("email", "==", email), limit(1));
  const docArray = await getDocs(q);

  if (docArray.empty) return { error: "User not found" };

  const doc = docArray.docs[0];

  return { data: doc.data() as UserType };
}
