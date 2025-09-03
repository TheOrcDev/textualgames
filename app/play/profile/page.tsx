import { notFound } from "next/navigation";

import { Subscription } from "@/db/schema";
import { getTotalGamesAndtotalLevels } from "@/server/games";
import { getUserProfile } from "@/server/users";

import { checkUsageLimit } from "@/lib/usage-tracking";

import { ProfileEditCard } from "@/components/profile-edit-card";
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
    <main className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="col-span-2">
          <ProfileEditCard user={user} />
        </div>
        <div className="flex flex-col gap-2 w-full col-span-1">
          <UserConfig user={user} />
          <UsageDashboard
            tier={tier}
            usageData={usageData}
            totalGamesAndLevels={totalGamesAndLevels}
          />
        </div>
      </div>
    </main>
  );
}
