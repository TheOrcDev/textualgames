import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTokens } from "@/server/tokens";

import ClerkButton from "../clerk-button/clerk-button";

export default async function UserInfo() {
  const tokens = await getTokens();

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
          <Badge className={`flex gap-1 ${tokens === 0 && "bg-destructive"}`}>
            {tokens}
            <Image
              src={"/img/tg-coin.png"}
              width={32}
              height={32}
              alt="Textual Games Token"
            />
          </Badge>
        </Link>

        <ClerkButton />
      </SignedIn>
    </div>
  );
}
