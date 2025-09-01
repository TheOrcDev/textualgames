import { Subscription } from "@/db/schema";
import { isSubscriptionValid } from "@/server/subscriptions";

import { PricingCard } from "./_components/pricing-card";

export default async function PricingPage() {
  const subscription = await isSubscriptionValid();

  return (
    <main className="flex flex-col gap-10 items-center justify-center">
      <h1>Pricing</h1>

      <PricingCard allowUpgrade={subscription} />
    </main>
  );
}
