"use client";

import { authClient } from "@/lib/auth-client";

import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

interface PricingCardProps {
  allowUpgrade: boolean;
}

export const PricingCard = ({ allowUpgrade }: PricingCardProps) => {
  const handleUpgrade = async () => {
    await authClient.checkout({
      slug: "pro",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <h2 className="text-2xl">$12/month</h2>
        <CardDescription>Get access to all features.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Create unlimited games, and play how much you want.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        {!allowUpgrade ? (
          <Button onClick={handleUpgrade}>Upgrade</Button>
        ) : (
          <Badge>active</Badge>
        )}
      </CardFooter>
    </Card>
  );
};
