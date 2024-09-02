import "./globals.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { GoogleAnalytics } from "@/components/features";
import { TRPCProvider } from "@/components/providers";
import { Footer, ThemeProvider } from "@/components/ui";
import { cn } from "@/lib/utils";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Textual Games - Create your own story!",
  description: "Create your own story! AI Generated Textual Games.",
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
        <GoogleAnalytics />
        <body className={cn(pressStart2P.className)}>
          <TRPCProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
