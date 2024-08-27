"use server";

import db from "@/db/drizzle";

import { Tokens } from "@/components/shared/types";
import { purchases } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { getTotalTokens } from "./queries";

const STRIPE_API_VERSION = "2024-06-20";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: STRIPE_API_VERSION,
});

const priceMap = {
    [Tokens.TEN]: 1,
    [Tokens.FIFTY]: 3.5,
    [Tokens.HUNDRED]: 6
};

const getTokenByPrice = (price: number) => {
    for (const [key, value] of Object.entries(priceMap)) {
        if (value === price) {
            return key;
        }
    }
    return Tokens.TEN;
}

export const getClientSecret = async (tokens: Tokens) => {
    const price = priceMap[tokens];

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(price) * 100,
            currency: "USD",
        });

        return paymentIntent.client_secret;
    } catch (e) {
        throw (e);
    }
}

export const getTokens = async () => {
    const user = await currentUser();

    try {
        const totalUserTokens = await getTotalTokens(user?.emailAddresses[0].emailAddress!);

        return totalUserTokens;
    } catch (e) {
        throw (e);
    }
}

export const getPaymentIntent = async (paymentIntentId: string, paymentIntentSecret: string) => {
    try {
        const user = await currentUser();

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
            return
        }

        const [existingRecord] = await db.select().from(purchases).where(eq(purchases.paymentIntentSecret, paymentIntentSecret));

        // Already Saved
        if (existingRecord) {
            return existingRecord.amount;
        }

        const amountOfTokens = getTokenByPrice(paymentIntent.amount / 100);

        await db.insert(purchases).values({
            email: user?.emailAddresses[0].emailAddress!,
            paymentIntent: paymentIntentId,
            paymentIntentSecret: paymentIntentSecret,
            amount: +amountOfTokens
        });

        // const { error } = await resend.emails.send({
        //     from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        //     to: [user?.emailAddresses[0].emailAddress!],
        //     subject: 'Your Meal Planning Starts Here',
        //     react: BoughtTokens({ tokens: amountOfTokens }),
        // });

        // if (error) {
        //     throw (error);
        // }

        return +amountOfTokens;
    } catch (e) {
        console.log(e)
    }
}