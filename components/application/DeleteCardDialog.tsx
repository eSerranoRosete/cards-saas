"use client";

import { deleteCard } from "@/firebase/card/deleteCard";
import { useIsLoading } from "@/hooks/useIsLoading";
import { useRouter } from "next/navigation";
import DialogConfirm from "../Dialogs/DialogConfirm";
import { useToast } from "./toast/useToast";
import { Button } from "@radix-ui/themes";
import { Trash } from "lucide-react";

type Props = {
  cardID: string;
};

export default function DeleteCardDialog({ cardID }: Props) {
  const loader = useIsLoading();
  const router = useRouter();

  const toast = useToast();

  const onDelete = async () => {
    loader.start();

    try {
      await deleteCard({ id: cardID });

      toast.success({
        title: "Card deleted",
        message: "Your card has been deleted successfully",
      });

      loader.stop();
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error({
        title: "Error",
        message: error as string,
      });

      loader.stop();
    }
  };

  return (
    <DialogConfirm
      onSuccess={onDelete}
      title="Are you absolutelty sure?"
      trigger={
        <Button color="red" className="gap-2">
          <Trash className="w-4" />
          Delete Card
        </Button>
      }
    >
      This action cannot be undone. This will permanently delete the card and
      all of its data.
    </DialogConfirm>
  );
}
