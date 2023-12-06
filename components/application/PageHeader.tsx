import { Flex, IconButton } from "@radix-ui/themes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Text } from "@radix-ui/themes";

type Props = {
  title?: string;
  actions?: React.ReactNode;
  backLink?: string;
};

export const PageHeader = ({ actions, title, backLink }: Props) => {
  return (
    <section className="flex my-7 items-center">
      <div className="grow flex space-x-2 items-baseline">
        <Flex gap="4" className="text-2xl font-semibold">
          {backLink && (
            <Link href={backLink}>
              <IconButton variant="soft" className="mr-2">
                <ChevronLeft />
              </IconButton>
            </Link>
          )}
          <Text>{title}</Text>
        </Flex>
      </div>
      {actions}
    </section>
  );
};
