import type { Metadata } from "next";

import { BuyTokens } from "@/components/features";
import { Header } from "@/components/ui";

export const metadata: Metadata = {
  title: "Textual Games - Buy Tokens",
  description:
    "Buy tokens and create your own story! AI Generated Textual Games.",
};

export default async function BuyTokensPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-10 p-12">
        <BuyTokens />
      </div>
    </>
  );
}
