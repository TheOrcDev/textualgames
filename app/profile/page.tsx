"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function AccountPage() {
  const { resolvedTheme } = useTheme();
  return (
    <main className="flex flex-col items-center">
      <UserProfile
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
        routing={"hash"}
      />
    </main>
  );
}
