import "./globals.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { Footer, ThemeProvider } from "@/components/ui";
import { GoogleAnalytics } from "@/components/entities";

import { cn } from "@/lib/utils";
import NextAuthProvider from "@/components/providers/next-auth-provider";
import { getSession } from "@/lib/auth";

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
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics />
      <body className={cn(pressStart2P.className)}>
        <NextAuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
