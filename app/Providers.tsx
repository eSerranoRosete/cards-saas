"use client";

import { Toaster } from "@/components/application/toast/Toaster";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </NextUIProvider>
  );
}
