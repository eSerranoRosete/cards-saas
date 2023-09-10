import { Button } from "@nextui-org/button";
import { ChevronLeft } from "lucide-react";
import NextLink from "next/link";

type Props = {
  title?: string;
  actions?: React.ReactNode;
  backLink?: string;
};

export const PageHeader = ({ actions, title, backLink }: Props) => {
  return (
    <section className="flex my-7 items-center">
      <div className="grow flex space-x-2 items-baseline">
        <h1 className="text-2xl flex gap-2 font-semibold">
          {backLink && (
            <Button
              href={backLink}
              as={NextLink}
              isIconOnly
              size="sm"
              className="mr-2"
            >
              <ChevronLeft />
            </Button>
          )}
          <span>{title}</span>
        </h1>
      </div>
      {actions}
    </section>
  );
};
