import { useIsLoading } from "@/hooks/useIsLoading";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";

type Props = {
  title: string;
  actionLabel?: string;
  children: React.ReactNode;
  trigger: ReactNode;
  stopProppagation?: boolean;
  onSuccess: () => void;
};

export default function DialogConfirm({
  title,
  actionLabel = "Confirm",
  children,
  trigger,
  stopProppagation,
  onSuccess,
}: Props) {
  const loader = useIsLoading();

  const onSuccessCb = async (e: any) => {
    loader.start();

    stopProppagation && e.stopPropagation();

    try {
      onSuccess();

      loader.stop();
    } catch (error: unknown) {
      loader.stop();
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger
        onClick={(e) => {
          stopProppagation && e.stopPropagation();
        }}
      >
        {trigger}
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{children}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              onClick={(e) => {
                stopProppagation && e.stopPropagation();
              }}
              variant="soft"
              color="gray"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={onSuccessCb}>
              {actionLabel}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
