import type { Metadata } from "next";

import { getUserTheme } from "@/server/users";
import { Analytics } from "@vercel/analytics/react";

import { Theme } from "@/lib/themes";

import { ScreenSize } from "@/components/ui/screen-size";
import { Toaster } from "@/components/ui/sonner";

import { ActiveThemeProvider } from "@/components/active-theme";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Textual Games - Play your own unique story",
  description:
    "Textual Games is a platform for creating unique stories, and playing them in a text-based adventure game. Start creating your own story today!",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  openGraph: {
    images: "/img/og-image.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getUserTheme();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden scroll-smooth retro antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveThemeProvider initialTheme={theme ?? Theme.Default}>
            {children}
            <Toaster />
            <Analytics />
            {process.env.APP_ENV === "development" && <ScreenSize />}
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
