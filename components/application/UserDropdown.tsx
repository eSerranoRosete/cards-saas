"use client";

import { Avatar, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { LogOut, UserIcon, Wallet } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export const UserDropdown = () => {
  const router = useRouter();

  const session = useSession();

  const user = session.data?.user;

  if (!user) return <></>;

  const initials = fallbackFromName(user.name || "");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer">
        <Flex gap="2" align="center">
          <Avatar radius="full" fallback={initials} />
          <Flex direction="column">
            <span className="text-sm">{user.name}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </Flex>
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => router.push("/profile")}>
          <Flex gap="2" align="center">
            <UserIcon className="w-4" />
            Your Profile
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => router.push("/profile?tab=billing")}>
          <Flex gap="2" align="center">
            <Wallet className="w-4" />
            Manage Billing
          </Flex>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item onClick={() => signOut({ callbackUrl: "/" })}>
          <Flex gap="2" align="center">
            <LogOut className="w-4" />
            Sign Out
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

function fallbackFromName(name: string) {
  const [first, last] = name.split(" ");
  const firstInitial = first.charAt(0);
  const lastInitial = last.charAt(0);

  return `${firstInitial}${lastInitial}`;
}
