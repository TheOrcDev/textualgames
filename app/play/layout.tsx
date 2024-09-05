import type { Metadata } from "next";

import { Header } from "@/components/ui";

export const metadata: Metadata = {
  title: "Textual Games - Create your own adventure",
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
      <main className="p-12 lg:p-24">{children}</main>
    </div>
  );
}
