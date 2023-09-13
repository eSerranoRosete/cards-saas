"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { LogOut, UserIcon, Wallet } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();

  const session = useSession();

  const user = session.data?.user;

  if (!user) return <></>;

  const initials = fallbackFromName(user.name || "");

  const iconClasses = "w-4 h-4 mr-2";

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            fallback: initials,
          }}
          className="transition-transform"
          description={user.email || ""}
          name={user.name || ""}
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

function fallbackFromName(name: string) {
  const [first, last] = name.split(" ");
  const firstInitial = first.charAt(0);
  const lastInitial = last.charAt(0);

  return `${firstInitial}${lastInitial}`;
}
