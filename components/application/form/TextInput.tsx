import { TextFieldInput, TextField, Flex, Text } from "@radix-ui/themes";
import { ErrorMessage } from "./ErrorMessage";
import { forwardRef } from "react";

type TextFieldInputProps = React.ComponentProps<typeof TextFieldInput>;

interface Props extends TextFieldInputProps {
  label?: string;
  errorMessage?: string;
  endContent?: React.ReactNode;
}

export const TextInput = forwardRef(
  ({ label, errorMessage, endContent, onChange, ...rest }: Props, ref) => {
    return (
      <Flex direction="column" gap="3">
        <label>
          <TextField.Root
            className="pt-5 px-2 relative"
            variant="soft"
            color="gray"
          >
            <Text
              as="div"
              size="1"
              mb="1"
              weight="bold"
              className="absolute top-1.5 left-2"
            >
              {label}
            </Text>
            <TextField.Input ref={ref as any} {...rest} onChange={onChange} />
            <TextField.Slot>{endContent}</TextField.Slot>
          </TextField.Root>
          <ErrorMessage message={errorMessage} />
        </label>
      </Flex>
    );
  }
);

TextInput.displayName = "TextInput";
