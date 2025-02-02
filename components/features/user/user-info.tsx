import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import ClerkButton from "../clerk-button/clerk-button";

export default function UserInfo() {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/my-games"}>My Games</Link>

      <SignedOut>
        <Button variant={"outline"} asChild>
          <SignInButton />
        </Button>
      </SignedOut>

      <SignedIn>
        <ClerkButton />
      </SignedIn>
    </div>
  );
}
