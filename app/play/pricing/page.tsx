import { Subscription } from "@/db/schema";
import { getUserSession } from "@/server/users";

import { PricingCard } from "./_components/pricing-card";

export default async function PricingPage() {
  const session = await getUserSession();
  const tier =
    (session.user.subscriptions?.tier as Subscription) ?? Subscription.FREE;

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-5 py-10">
      <PricingCard tier={tier} />
    </main>
  );
}
