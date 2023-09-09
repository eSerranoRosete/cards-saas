import { Button, ButtonProps } from "@nextui-org/button";
import React from "react";

interface Props extends ButtonProps {}

export const AppButton = ({ ...rest }: Props) => {
  return (
    <Button {...rest} startContent={!rest.isLoading && rest.startContent} />
  );
};
