import { cn } from "@/lib/utils";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";

type ButtonProps = React.ComponentProps<typeof Button>;

interface Props extends ButtonProps {
  icon?: React.ReactNode;
  isLoading?: boolean;
}

interface Props extends ButtonProps {}

export const AppButton = ({
  icon,
  isLoading,
  children,
  className,
  ...rest
}: Props) => {
  const Icon = icon;

  return (
    <Button
      {...rest}
      className={cn("gap-2 !cursor-pointer", className)}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="w-4 animate-spin" /> : Icon}
      {children}
    </Button>
  );
};
