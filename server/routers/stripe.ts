import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import Stripe from "stripe";
import { z } from "zod";

import { BoughtTokens } from "@/components/emails/bought-tokens";
import { Tokens } from "@/components/shared/types";
import db from "@/db/drizzle";
import { purchases } from "@/db/schema";

import { publicProcedure, router } from "../trpc";

const STRIPE_API_VERSION = "2024-09-30.acacia";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: STRIPE_API_VERSION,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const priceMap = {
  [Tokens.TEN]: 1,
  [Tokens.FIFTY]: 3.5,
  [Tokens.HUNDRED]: 6,
};

const getTokenByPrice = (price: number) => {
  for (const [key, value] of Object.entries(priceMap)) {
    if (value === price) {
      return key;
    }
  }
  return Tokens.TEN;
};

export const stripeRouter = router({
  createPaymentIntent: publicProcedure
    .input(z.object({ amount: z.number() }))
    .mutation(async (opts) => {
      const { input } = opts;

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Number(input.amount) * 100,
          currency: "USD",
        });

        return new NextResponse(
          JSON.stringify({ clientSecret: paymentIntent.client_secret }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }),
  getClientSecret: publicProcedure
    .input(z.object({ tokens: z.nativeEnum(Tokens) }))
    .mutation(async (opts) => {
      const { input } = opts;

      const price = priceMap[input.tokens];

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Number(price) * 100,
          currency: "USD",
        });

        return paymentIntent.client_secret;
      } catch (e) {
        throw e;
      }
    }),
  getPaymentIntent: publicProcedure
    .input(
      z.object({ paymentIntent: z.string(), paymentIntentSecret: z.string() }),
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const user = await currentUser();

        const paymentIntent = await stripe.paymentIntents.retrieve(
          input.paymentIntent,
        );

        if (paymentIntent.status !== "succeeded") {
          return;
        }

        // Check if this payment has already been processed
        const [existingRecord] = await db
          .select()
          .from(purchases)
          .where(eq(purchases.paymentIntentSecret, input.paymentIntentSecret));

        // Already Saved
        if (existingRecord) {
          return existingRecord.amount;
        }

        const amountOfTokens = getTokenByPrice(paymentIntent.amount / 100);

        // Save the payment
        await db.insert(purchases).values({
          email: user?.emailAddresses[0].emailAddress!,
          paymentIntent: input.paymentIntent,
          paymentIntentSecret: input.paymentIntentSecret,
          amount: +amountOfTokens,
        });

        const { error } = await resend.emails.send({
          from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
          to: [user?.emailAddresses[0].emailAddress!],
          subject: "Your Story Starts Here",
          react: BoughtTokens({ tokens: amountOfTokens }),
        });

        if (error) {
          throw error;
        }

        return +amountOfTokens;
      } catch (e) {
        console.log(e);
      }
    }),
});
