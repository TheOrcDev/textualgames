"use client";

import { Elements } from "@stripe/react-stripe-js";
import { Coins } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

import { Tokens } from "@/components/shared/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getStripe from "@/lib/stripe";
import { getClientSecret } from "@/server/tokens";

import PaymentForm from "./payment-form";

export default function BuyTokens() {
  const stripePromise = getStripe();
  const { resolvedTheme } = useTheme();

  const [paymentIntentSecret, setPaymentIntentSecret] = useState("");
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const buyTokens = async (bundle: Tokens) => {
    const clientSecret = await getClientSecret(bundle);

    if (!clientSecret) {
      console.log("No client secret");
      return;
    }

    setPaymentIntentSecret(clientSecret);
    setShowPayment(true);
  };

  return (
    <>
      {!showPayment && (
        <>
          <div className="grid w-full gap-5 font-mono md:grid-cols-2 lg:px-20 xl:grid-cols-3">
            <Card
              className="cursor-pointer from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-primary/10 hover:bg-gradient-to-br"
              onClick={() => buyTokens(Tokens.TEN)}
            >
              <CardHeader>
                <CardTitle>Cheapest</CardTitle>
                <CardDescription>1$</CardDescription>
              </CardHeader>
              <CardContent className="md:min-h-96">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-1 text-xl">
                    10
                    <Coins className="size-4" />
                  </div>
                  <p>
                    Looking to try out Textual Games or just need a quick boost?
                    The Cheapest option is perfect for you! For just $1,
                    you&apos;ll get 10 tokens to start creating your own
                    stories.
                  </p>
                  <p>
                    It&apos;s an affordable way to explore and feel the game and
                    see how much you can accomplish.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => buyTokens(Tokens.TEN)}>
                  Get 10 Tokens
                </Button>
              </CardFooter>
            </Card>

            <Card
              className="cursor-pointer from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-primary/10 hover:bg-gradient-to-br"
              onClick={() => buyTokens(Tokens.FIFTY)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between gap-2">
                  <span>Efficent</span>
                  <Badge className="text-center">Most Popular</Badge>
                </CardTitle>
                <CardDescription>3.5$</CardDescription>
              </CardHeader>
              <CardContent className="md:min-h-96">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-1 text-xl">
                    50
                    <Coins className="size-4" />
                  </div>
                  <p>
                    Get more bang for your buck with our Efficient package! For
                    only $3.50, you&apos;ll receive 50 tokens, giving you the
                    flexibility to go deep in your story.
                  </p>
                  <p>
                    This option is ideal for regular users who want to play
                    Textual Games on daily basis.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => buyTokens(Tokens.FIFTY)}>
                  Get 50 Tokens
                </Button>
              </CardFooter>
            </Card>

            <Card
              className="cursor-pointer from-primary/40 to-transparent transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-primary/10 hover:bg-gradient-to-br"
              onClick={() => buyTokens(Tokens.HUNDRED)}
            >
              <CardHeader>
                <CardTitle>Best Deal</CardTitle>
                <CardDescription>6$</CardDescription>
              </CardHeader>
              <CardContent className="md:min-h-96">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-1 text-xl">
                    100
                    <Coins className="size-4" />
                  </div>
                  <p>
                    Ready to go all in? The Best Deal offers incredible value
                    with 100 tokens for just $6! This package is perfect for
                    gaming enthusiasts who want the freedom to play even 100
                    levels!
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => buyTokens(Tokens.HUNDRED)}>
                  Get 100 Tokens
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      {paymentIntentSecret && showPayment && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentSecret,
            appearance: {
              theme: resolvedTheme === "dark" ? "night" : "flat",
            },
          }}
        >
          <PaymentForm back={() => setShowPayment(false)} />
        </Elements>
      )}
    </>
  );
}
