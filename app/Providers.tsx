"use client";

import { Toaster } from "@/components/application/toast/Toaster";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </Theme>
  );
}
