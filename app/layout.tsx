import "./globals.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { GoogleAnalytics } from "@/components/features";
import { ThemeProvider, TRPCProvider } from "@/components/providers";
import { Footer } from "@/components/ui";
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
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
