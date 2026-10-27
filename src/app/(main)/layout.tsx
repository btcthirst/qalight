import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { BodyScripts, HeadAssets } from "@/components/Assets";

export const metadata: Metadata = {
  title: "Учет запчастей",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function AppRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadAssets />
      </head>
      <body className="skin-blue">
        <BodyScripts />
        {children}
      </body>
    </html>
  );
}
