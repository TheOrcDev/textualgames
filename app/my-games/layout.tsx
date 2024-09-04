import type { Metadata } from "next";

import { Header } from "@/components/ui";

export const metadata: Metadata = {
  title: "Textual Games - My games",
  description: "Create your own story! AI Generated Textual Games.",
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
