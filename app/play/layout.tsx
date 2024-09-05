import type { Metadata } from "next";

import { Header } from "@/components/ui";

export const metadata: Metadata = {
  title: "Choose Your Adventure: Play Textual Games",
  description:
    "Discover and play AI-generated interactive stories. Choose your adventure and dive into unique, player-created games with Textual Games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="p-12 lg:p-24">{children}</main>
    </div>
  );
}
