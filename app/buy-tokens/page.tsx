import type { Metadata } from "next";

import { BuyTokens } from "@/components/features";

export const metadata: Metadata = {
  title: "Buy Tokens: Fuel Your Adventure on Textual Games",
  description:
    "Purchase tokens to create, play, and enhance your stories. Get the tokens you need to keep your adventures going on Textual Games.",
};

export default async function BuyTokensPage() {
  return (
    <>
      <div>
        <BuyTokens />
      </div>
    </>
  );
}
