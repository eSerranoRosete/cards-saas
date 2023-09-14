"use client";

import { Toaster } from "@/components/application/toast/Toaster";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
