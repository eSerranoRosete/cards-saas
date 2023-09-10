import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import NextLink from "next/link";
import UserDropdown from "./ProfileDropdown";
import { LockIcon } from "lucide-react";
import { AppLogo } from "./AppLogo";

export const AppBar = () => {
  return (
    <header className="w-full">
      <nav className="container flex items-center m-auto py-4">
        <NextLink href="/dashboard" className="font-semibold mr-10 flex gap-2">
          <AppLogo />
          Inteminer
        </NextLink>
        <div className="grow flex gap-4">
          <Button
            href="/dashboard"
            as={NextLink}
            size="md"
            className="bg-foreground text-background"
          >
            Dashboard
          </Button>
          <Button
            href="/analytics"
            isDisabled
            as={NextLink}
            variant="light"
            size="md"
            endContent={<LockIcon className="w-4" />}
          >
            Analytics
          </Button>
        </div>
        <UserDropdown />
      </nav>
      <Divider />
    </header>
  );
};
