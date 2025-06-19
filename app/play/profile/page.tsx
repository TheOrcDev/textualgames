import { getUserProfile } from "@/server/users";

import UserForm from "@/components/forms/update-user-form";

export default async function AccountPage() {
  const user = await getUserProfile();
  return (
    <main className="flex flex-col items-center justify-center">
      <UserForm
        defaultValues={{
          name: user.name,
          email: user.email,
        }}
      />
    </main>
  );
}
