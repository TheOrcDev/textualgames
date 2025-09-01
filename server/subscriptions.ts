"use server";

import db from "@/db/drizzle";
import { Subscription, subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserSession } from "./users";

export const updateSubscription = async (userId: string, subscription: Subscription) => {
    const session = await getUserSession();

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

export const checkSubscription = async () => {
    const session = await getUserSession();

    try {
        if (session.user.subscriptions?.tier === Subscription.PRO) {
            return {
                success: false,
                message: "You already have a pro subscription.",
            }
        }

        return {
            success: true,
            message: "You don't have a pro subscription.",
        }
    } catch (e) {
        console.log(e);
    }
};
