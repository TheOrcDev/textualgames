import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers";
import GlassmorphNavbar from "@/components/ui/glassmorph-navbar";
import { ScreenSize } from "@/components/ui/screen-size";
import { Toaster } from "@/components/ui/toaster";
import { getTokens } from "@/server/tokens";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Textual Games - Play your own unique story",
  description:
    "Textual Games is a platform for creating unique stories, and playing them in a text-based adventure game. Start creating your own story today!",
  openGraph: {
    images: "/img/og-image.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens();

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="overflow-x-hidden scroll-smooth font-mono antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GlassmorphNavbar tokens={tokens} />
            {children}
            <Toaster />
            <Analytics />
            {process.env.APP_ENV === "development" && <ScreenSize />}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
