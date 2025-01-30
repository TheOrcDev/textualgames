import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { ThemeProvider } from "@/components/providers";
import Footer from "@/components/ui/footer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ScreenSize } from "@/components/ui/screen-size";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Textual Games - Create your own unique story",
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
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            pressStart2P.className,
            "antialiased overflow-x-hidden scroll-smooth"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute inset-x-0 top-0 flex justify-end px-5 py-3">
              <ModeToggle />
            </div>
            {children}
            <Footer />
            <Toaster />
            <Analytics />
            {process.env.APP_ENV === "development" && <ScreenSize />}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
