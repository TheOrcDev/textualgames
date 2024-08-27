"use client";

import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

import { Button } from "@/components/ui";

export default function UserInfo() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* <Link href={"/my-meal-plans"}>
        <Button variant={"outline"}>My Meal Plans</Button>
      </Link> */}

      <SignedOut>
        <Button variant={"outline"} asChild>
          <SignInButton />
        </Button>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </SignedIn>
    </div>
  );
}
