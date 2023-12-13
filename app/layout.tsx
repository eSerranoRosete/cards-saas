import type { Metadata, Viewport } from "next";
import { Providers } from "./Providers";

import "./globals.css";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "Moduly",
  description:
    "Unlock the possibilities with Moduly – Your personalized gateway to seamless connections. Elevate your online presence effortlessly and showcase all that defines you in one click. #ModulyMagic ✨",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "Eduardo Serrano" }],
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
