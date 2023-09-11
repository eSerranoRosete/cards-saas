"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardType } from "../../types/CardTypes";

import { uploadCardMedia } from "./uploadCardMedia";

export const createCard = async (values: CardType): Promise<string | null> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return null;
  }

  const { id } = session.user;

  const xata = getXataClient();

  const cachedAvatar = values.avatar;
  const cachedCover = values.cover;

  delete values.avatar;
  delete values.cover;

  const card = await xata.db.card.create({
    ...values,

    user: { id },
  });

  if (cachedAvatar?.base64Content) {
    await uploadCardMedia({
      id: card.id,
      file: cachedAvatar,
      destination: "avatar",
    });
  }

  if (cachedCover?.base64Content) {
    await uploadCardMedia({
      id: card.id,
      file: cachedCover,
      destination: "cover",
    });
  }

  revalidatePath("/*");

  return card.id;
};
