import type { Metadata } from "next";

import Header from "@/components/ui/header/header";

export const metadata: Metadata = {
  title: "Play Your Game: Interactive Story on Textual Games",
  description:
    "Immerse yourself in your own AI-generated story. Play, make choices, and experience your interactive adventure with Textual Games.",
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
