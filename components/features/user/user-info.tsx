"use client";

import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Badge, Button } from "@/components/ui";
import { trpc } from "@/server/client";

export default function UserInfo() {
  const tokens = trpc.tokens.getTokens.useQuery();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Link href={"/my-games"}>
        <Button variant={"outline"}>My Games</Button>
      </Link>

      <SignedOut>
        <Button variant={"outline"} asChild>
          <SignInButton />
        </Button>
      </SignedOut>

      <SignedIn>
        <Link href={"/buy-tokens"}>
          <Badge
            className={`flex gap-1 ${tokens?.data === 0 && "bg-destructive"}`}
          >
            {tokens.isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              tokens?.data
            )}
            <Image
              src={"/img/tg-coin.png"}
              width={32}
              height={32}
              alt="Textual Games Token"
            />
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
