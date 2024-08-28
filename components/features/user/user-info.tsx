"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Badge, Button } from "@/components/ui";
import { getTokens } from "@/lib/tokens";

export default function UserInfo() {
  const [tokens, setTokens] = useState<number>(0);

  useEffect(() => {
    const getTokenAmount = async () => {
      const amount = await getTokens();
      setTokens(amount);
    };
    getTokenAmount();
  }, []);
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
        <Link href={"/buy-tokens"}>
          <Badge className={`${tokens === 0 && "bg-destructive"}`}>
            {tokens} tokens
          </Badge>
        </Link>

        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </SignedIn>
    </div>
  );
}
