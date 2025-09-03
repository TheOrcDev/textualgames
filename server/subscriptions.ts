"use server";

import db from "@/db/drizzle";
import { Subscription, subscriptions } from "@/db/schema";
import { checkUsageLimit } from "@/lib/usage-tracking";
import { eq } from "drizzle-orm";
import { getUserSession } from "./users";

export const updateSubscription = async (userId: string, subscription: Subscription) => {
    try {
        await db.update(subscriptions).set({ tier: subscription }).where(eq(subscriptions.userId, userId));
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
    } catch (e) {
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
    } catch (e) {
        return Subscription.FREE;
    }
}