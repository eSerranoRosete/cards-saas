"use client";

import { Toaster } from "@/components/application/toast/Toaster";
import { SessionProvider } from "next-auth/react";

import { Theme } from "@radix-ui/themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme
      className="min-h-screen dark:bg-zinc-950"
      appearance="dark"
      grayColor="slate"
      radius="large"
    >
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </Theme>
  );
}
