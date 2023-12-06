import GoogleAnalytics from "@/components/Layout/GoogleAnalytics";

import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Textual Games",
  description: "A collection of text-based games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={pressStart2P.className}>{children}</body>
    </html>
  );
}
