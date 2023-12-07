import { Flex, TextArea, Text } from "@radix-ui/themes";
import { ErrorMessage } from "./ErrorMessage";
import { forwardRef } from "react";

type TextAreaInputProps = React.ComponentProps<typeof TextArea>;

interface Props extends TextAreaInputProps {
  label?: string;
  errorMessage?: string;
}

export const TextAreaInput = forwardRef(
  ({ label, errorMessage, ...rest }: Props, ref) => {
    return (
      <Flex direction="column" gap="3" className="relative" color="gray">
        <Text
          as="label"
          size="1"
          mb="1"
          weight="bold"
          className="absolute top-1.5 left-2 mb-2 peer-focus:text-500"
        >
          {label}
        </Text>
        <TextArea
          {...rest}
          ref={ref as any}
          variant="soft"
          color="gray"
          className="pt-5"
          rows={5}
        />
        <ErrorMessage message={errorMessage} />
      </Flex>
    );
  }
);
