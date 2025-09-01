import { notFound } from "next/navigation";

import { Subscription } from "@/db/schema";
import { getTotalGamesAndtotalLevels } from "@/server/games";
import { isSubscriptionValid } from "@/server/subscriptions";
import { getUserProfile } from "@/server/users";

import { checkUsageLimit } from "@/lib/usage-tracking";

import { UsageDashboard } from "@/components/usage-dashboard";
import { UserConfig } from "@/components/user-config";

export default async function AccountPage() {
  const user = await getUserProfile();

  const tier = (user.subscriptions?.tier as Subscription) ?? Subscription.FREE;
  const usageData = await checkUsageLimit(user.id);
  const totalGamesAndLevels = await getTotalGamesAndtotalLevels(user.id);

  if (!user) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <UserConfig user={user} />
      <UsageDashboard
        tier={tier}
        usageData={usageData}
        totalGamesAndLevels={totalGamesAndLevels}
      />
    </main>
  );
}
