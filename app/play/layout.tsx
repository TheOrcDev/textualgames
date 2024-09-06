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
      <main className="p-8 lg:px-24 xl:px-52">{children}</main>
    </div>
  );
}
