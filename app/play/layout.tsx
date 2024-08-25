import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });
import { Header } from "@/components/ui";

import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased pb-20",
        pressStart2P.className
      )}
    >
      <Header />
      {children}
    </div>
  );
}
