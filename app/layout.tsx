import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { GoogleAnalytics } from "@/components/features";
import { ThemeProvider } from "@/components/providers";
import Footer from "@/components/ui/footer/footer";
import { ScreenSize } from "@/components/ui/screen-size";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Textual Games - Create your own story with AI",
  description:
    "Explore your creativity with Textual Games. Design, write, and play your own AI-generated stories. Start creating your interactive adventure today!",
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
      <html
        lang="en"
        suppressHydrationWarning
        className="overflow-x-hidden scroll-smooth"
      >
        <GoogleAnalytics />
        <body className={cn(pressStart2P.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
