"use server";

import TextualGamesCancelEmail from "@/components/emails/cancel-pro-subscription";
import TextualGamesProEmail from "@/components/emails/pro-subscription";
import db from "@/db/drizzle";
import { Subscription, subscriptions } from "@/db/schema";
import { checkUsageLimit } from "@/lib/usage-tracking";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { getUserById, getUserSession } from "./users";

export const updateSubscription = async (userId: string, subscription: Subscription, isPro: boolean) => {
    try {
        await db.update(subscriptions).set({ tier: subscription }).where(eq(subscriptions.userId, userId));

        const user = await getUserById(userId);

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
            to: [user.email],
            subject: isPro ? "Pro Subscription Activated - Textual Games" : "Pro Subscription Cancelled - Textual Games",
            react: isPro ? TextualGamesProEmail({ userName: user.name }) : TextualGamesCancelEmail({ userName: user.name }),
        });
    } catch (e) {
        console.log(e);
    }
}

export const getSubscriptions = async () => {
    try {
        return await db.select().from(subscriptions);
    } catch (e) {
        console.log(e);
    }
}

export const getPolarSubscription = async () => {
    try {
        const polarSubscriptions = await getSubscriptions();

        const subscriptions = polarSubscriptions?.map((subscription) => {
            return {
                productId: subscription.polarProductId,
                slug: subscription.slug,
            }
        })

        return subscriptions;
    } catch (e) {
        console.log(e);
    }
}

export const isSubscriptionValid = async (): Promise<boolean> => {
    const session = await getUserSession();

    try {
        const usage = await checkUsageLimit(session.user.id);
        const tier = session.user.subscriptions?.tier as Subscription ?? Subscription.FREE;

        if (tier !== Subscription.FREE) {
            return true
        }

        return usage?.canProceed
    } catch {
        return false;
    }
};

export const isSubscriptionValidForUser = async (userId: string): Promise<boolean> => {
    const usage = await checkUsageLimit(userId);
    const tier = await getSubscriptionForUser(userId);

    if (tier !== Subscription.FREE) {
        return true
    }

    return usage?.canProceed
}

export const getSubscriptionForUser = async (userId: string): Promise<Subscription> => {
    try {
        const subscription = await db.query.subscriptions.findFirst({
            where: eq(subscriptions.userId, userId),
        });

        return subscription?.tier as Subscription ?? Subscription.FREE;
    } catch {
        return Subscription.FREE;
    }
}