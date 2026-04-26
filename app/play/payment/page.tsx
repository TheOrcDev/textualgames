import Link from "next/link";

import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-5 py-10">
      <Card className="relative w-full max-w-md overflow-hidden border-primary/30 bg-card/85 backdrop-blur">
        <GridScanOverlay gridSize={72} scanSpeed={16} />
        <div className="relative">
          <UplinkHeader leftText="PAYMENT CONFIRMED" rightText="PRO ACTIVE" />
        </div>
        <CardHeader className="relative">
          <CardTitle className="font-mono uppercase tracking-wider">
            Welcome to the Pro tier
          </CardTitle>
          <CardDescription>
            You now have access to all features.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p>You can now create unlimited games, and play how much you want.</p>
        </CardContent>
        <CardFooter className="relative flex flex-col gap-5">
          <p>Thank you for supporting Textual Games!</p>
          <Button asChild>
            <Link href="/play/create-character">Create Story</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
