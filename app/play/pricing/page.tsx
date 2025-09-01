import { Subscription } from "@/db/schema";
import { checkSubscription } from "@/server/subscriptions";

import { PricingCard } from "./_components/pricing-card";

export default async function PricingPage() {
  const subscription = await checkSubscription();

  return (
    <main className="flex flex-col gap-10 items-center justify-center">
      <h1>Pricing</h1>

      <PricingCard allowUpgrade={subscription === Subscription.FREE} />
    </main>
  );
}
