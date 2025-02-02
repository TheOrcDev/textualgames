"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <main className="flex h-screen items-center justify-center pt-20 md:p-24">
      <SignIn
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
    </main>
  );
}
