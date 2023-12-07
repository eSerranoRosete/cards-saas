import { Button } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";
import { AppLogo } from "./AppLogo";
import { UserDropdown } from "./UserDropdown";

export const AppBar = () => {
  return (
    <header className="w-full">
      <nav className="container flex items-center m-auto py-4">
        <NextLink href="/dashboard" className="font-semibold mr-10 flex gap-2">
          <AppLogo />
        </NextLink>
        <div className="grow flex gap-4">
          <Link href="/dashboard">
            <Button variant="soft" color="gray">
              Dashboard
            </Button>
          </Link>
        </div>
        <UserDropdown />
      </nav>
    </header>
  );
};
