import { getUserProfile } from "@/server/users";

import { UserConfig } from "@/components/user-config";

export default async function AccountPage() {
  const user = await getUserProfile();

  return (
    <main className="flex flex-col items-center justify-center">
      <UserConfig user={user} />
    </main>
  );
}
