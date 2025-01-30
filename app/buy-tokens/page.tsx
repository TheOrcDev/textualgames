import type { Metadata } from "next";

import { BuyTokens } from "@/components/features";
import Header from "@/components/ui/header";

export const metadata: Metadata = {
  title: "Buy Tokens: Fuel Your Adventure on Textual Games",
  description:
    "Purchase tokens to create, play, and enhance your AI-generated stories. Get the tokens you need to keep your adventures going on Textual Games.",
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
