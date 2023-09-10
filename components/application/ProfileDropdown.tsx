"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { LogOut, UserIcon, Wallet } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();

  const iconClasses = "w-4 h-4 mr-2";

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            fallback: "ES",
          }}
          className="transition-transform"
          description="eserranor98@gmail.com  "
          name="Eduardo Serrano"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        onAction={(key) => {
          if (key !== "sign-out") {
            router.push(`/${key}`);
          } else {
            signOut({ callbackUrl: "/" });
          }
        }}
      >
        <DropdownItem
          key="profile"
          startContent={<UserIcon className={iconClasses} />}
        >
          <span className="text-sm">Your Profile</span>
        </DropdownItem>
        <DropdownItem
          key="profile?tab=billing"
          startContent={<Wallet className={iconClasses} />}
        >
          <span className="text-sm">Manage Billing</span>
        </DropdownItem>

        <DropdownItem
          key="sign-out"
          color="danger"
          startContent={<LogOut className={iconClasses} />}
        >
          <span className="text-sm">Sign Out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
