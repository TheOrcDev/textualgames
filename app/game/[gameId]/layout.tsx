import type { Metadata } from "next";

import { Header } from "@/components/ui";

export const metadata: Metadata = {
  title: "Textual Games - My game",
  description: "Create your own story! AI Generated Textual Games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
