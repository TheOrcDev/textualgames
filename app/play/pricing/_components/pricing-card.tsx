"use client";

import { Subscription } from "@/db/schema";

import { authClient } from "@/lib/auth-client";

import { PricingCard as GridPricingCard } from "@/components/thegridcn/pricing-card";

interface PricingCardProps {
  tier: Subscription;
}

export const PricingCard = ({ tier }: PricingCardProps) => {
  const handleUpgrade = async () => {
    await authClient.checkout({
      slug: "pro",
    });
  };

  return (
    <GridPricingCard
      title="Pro"
      price="$12"
      period="/month"
      description="Unlimited story creation and longer play sessions."
      features={[
        { text: "Create unlimited games", included: true },
        { text: "Play without monthly story caps", included: true },
        { text: "Keep your active story archive", included: true },
      ]}
      ctaText={tier === Subscription.FREE ? "Upgrade" : "Active"}
      onCtaClick={tier === Subscription.FREE ? handleUpgrade : undefined}
      highlighted
      badge={tier === Subscription.FREE ? "PRO" : "ACTIVE"}
      className="w-full max-w-sm"
    />
  );
};
