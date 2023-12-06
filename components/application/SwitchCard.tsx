import { Card, Switch, Text } from "@radix-ui/themes";
import { forwardRef } from "react";

// Extract the prop types of the Switch component
type SwitchProps = React.ComponentProps<typeof Switch>;

interface Props extends SwitchProps {
  title?: string;
  description?: string;
}

export const SwitchCard = forwardRef(
  ({ description, title, ...rest }: Props, ref) => {
    return (
      <Card>
        <div className="flex flex-row items-center justify-between">
          <div className="flex justify-between items-center">
            <div>
              <Text className="font-medium">{title}</Text>
              <Text className="text-sm block  mb-5 text-default-400">
                {description}
              </Text>
            </div>
          </div>
          <Switch ref={ref as any} {...rest} />
        </div>
      </Card>
    );
  }
);

SwitchCard.displayName = "SwitchCard";
