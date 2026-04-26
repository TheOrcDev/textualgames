import type { Metadata } from "next";

import { getUserTheme } from "@/server/users";
import { Analytics } from "@vercel/analytics/react";

import { DEFAULT_THEME, normalizeTheme } from "@/lib/themes";

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
  const activeTheme = normalizeTheme(theme);

  return (
    <html lang="en" data-theme={activeTheme} suppressHydrationWarning>
      <body
        className="overflow-x-hidden scroll-smooth antialiased"
        data-theme={activeTheme}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ActiveThemeProvider initialTheme={theme ?? DEFAULT_THEME}>
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
