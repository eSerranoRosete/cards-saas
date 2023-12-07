import { Text } from "@radix-ui/themes";

type Props = {
  message?: string;
};

export const ErrorMessage = ({ message }: Props) => {
  if (!message) return <></>;

  return (
    <Text size="1" className="text-red-500">
      {message}
    </Text>
  );
};
