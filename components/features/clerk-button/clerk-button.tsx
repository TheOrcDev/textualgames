"use client";

import { ClerkLoading, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Skeleton } from "@/components/ui";

export default function ClerkButton() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <ClerkLoading>
        <Skeleton className="size-8 rounded-full" />
      </ClerkLoading>
      <UserButton
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
    </>
  );
}
