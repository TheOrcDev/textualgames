import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function NotEnoughTokens() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Not enough tokens :(</CardTitle>
          <CardDescription>
            You need at least one token to play.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p>
            Ready to unlock more? Get tokens now and continue playing your
            story.
          </p>
          <Link href={"/buy-tokens"}>
            <Button>Buy Now!</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
