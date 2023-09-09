import { Card, CardBody } from "@nextui-org/card";
import { Switch, SwitchProps } from "@nextui-org/switch";
import { forwardRef } from "react";

interface Props extends SwitchProps {
  title?: string;
  description?: string;
}

export const SwitchCard = forwardRef(
  ({ description, title, ...rest }: Props, ref) => {
    return (
      <Card>
        <CardBody className="flex flex-row items-center justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{title}</h4>
              <p className="text-xs text-default-500">{description}</p>
            </div>
          </div>
          <Switch ref={ref as any} {...rest} />
        </CardBody>
      </Card>
    );
  }
);
