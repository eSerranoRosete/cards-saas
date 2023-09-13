"use server";

import { UserType } from "@/types/UserTypes";
import { getUserCollection } from "../helpers/getUserCollection";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseResponse } from "../types";
import { getUserByEmail } from "./getUserByEmail";
import { hash } from "bcrypt";

type Props = {
  data: Omit<UserType, "id">;
};

export async function createUser({
  data,
}: Props): Promise<FirebaseResponse<UserType>> {
  const userCollection = await getUserCollection();

  const response = await getUserByEmail({ email: data.email });

  if (response.data) return { error: "User already exists" };

  const hashed = await hash(data.password, 10);

  const docRef = doc(userCollection);

  await setDoc(docRef, {
    ...data,
    password: hashed,
    id: docRef.id,
  });

  const docSnap = await getDoc(docRef);

  return { data: docSnap.data() as UserType };
}
