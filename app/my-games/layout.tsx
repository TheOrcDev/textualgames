import type { Metadata } from "next";

import Header from "@/components/ui/header/header";

export const metadata: Metadata = {
  title: "My Games: Explore Your Creations on Textual Games",
  description:
    "View, edit, and continue your AI-generated stories. Explore all your past creations and keep the adventure going with Textual Games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center gap-5 p-5 py-10 md:px-24">
        {children}
      </main>
    </div>
  );
}
