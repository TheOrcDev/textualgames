import { notFound } from "next/navigation";

import { getUserProfile } from "@/server/users";

import { UsageDashboard } from "@/components/usage-dashboard";
import { UserConfig } from "@/components/user-config";

export default async function AccountPage() {
  const user = await getUserProfile();

  if (!user) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <UserConfig user={user} />
      <UsageDashboard userId={user.id} />
    </main>
  );
}
