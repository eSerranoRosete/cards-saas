"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { CardType, MediaFile } from "../../types/CardTypes";
import { processBase64 } from "@/lib/processBase64";

type Props = {
  id: string;
  file: MediaFile;
  destination: keyof Pick<CardType, "avatar" | "cover" | "carouselImages">;
  destinationIsArray?: boolean;
};

export const uploadCardMedia = async ({
  id,
  file,
  destination,
  destinationIsArray = false,
}: Props): Promise<string | null> => {
  const session = await getServerSession(options);

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const xata = getXataClient();

  const currentCard = await xata.db.card.filter({ id }).getFirst();

  if (!currentCard?.user) {
    throw new Error("Card not found");
  }

  if (currentCard.user.id !== user.id) {
    throw new Error("You don't have permission to update this card");
  }

  file.base64Content = processBase64(file.base64Content);

  let updated: string | null = null;

  if (destinationIsArray) {
    const update = await currentCard.update({
      [destination as string]: file,
    });

    update && (updated = update.id);
  } else {
    delete file.id;

    const update = await currentCard.update({
      [destination as string]: file,
    });
    update && (updated = update.id);
  }

  if (!updated) {
    return null;
  }

  revalidatePath("/*");

  return updated;
};
