import "./globals.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { Footer, ThemeProvider } from "@/components/ui";
import { GoogleAnalytics } from "@/components/entities";

import { cn } from "@/lib/utils";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Textual Games - Create your own story!",
  description: "Create your own story! AI Generated Textual Games.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
