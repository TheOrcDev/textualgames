import { notFound } from "next/navigation";

import { getTotalGamesAndtotalLevels } from "@/server/games";
import { getUserProfile } from "@/server/users";

import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { ProfileEditCard } from "@/components/profile-edit-card";
import { UsageDashboard } from "@/components/usage-dashboard";
import { UserConfig } from "@/components/user-config";

export default async function AccountPage() {
  const user = await getUserProfile();

  const totalGamesAndLevels = await getTotalGamesAndtotalLevels(user.id);

  if (!user) {
    return notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pb-12 pt-6">
      <UplinkHeader leftText="PROFILE GRID" rightText={user.email} />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <ProfileEditCard user={user} />
        </div>
        <div className="col-span-1 flex w-full flex-col gap-3">
          <UserConfig user={user} />
          <UsageDashboard totalGamesAndLevels={totalGamesAndLevels} />
        </div>
      </div>
    </main>
  );
}
