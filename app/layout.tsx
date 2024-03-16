import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { Footer, GoogleAnalytics, Header } from "@/components";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Textual Games - Create your own story!",
  description: "Create your own story! AI Generated Textual Games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={pressStart2P.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
