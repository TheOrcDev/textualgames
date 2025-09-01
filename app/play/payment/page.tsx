import Link from "next/link";

import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

export default function PaymentPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to the Pro tier!</CardTitle>
          <CardDescription>
            You now have access to all features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>You can now create unlimited games, and play how much you want.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <p>Thank you for supporting Textual Games!</p>
          <Button asChild>
            <Link href="/play/create-character">Create a game</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
