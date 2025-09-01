import db from "@/db/drizzle";
import { Subscription, subscriptions, usageLimits, userUsage } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";

export interface UsageCheckResult {
    canProceed: boolean;
    currentLevels: number;
    maxLevels: number;
    remainingLevels: number;
    message?: string;
}

export interface TokenUsage {
    totalTokens: number;
}

export async function checkUsageLimit(userId: string): Promise<UsageCheckResult> {
    try {
        // Get user's subscription tier
        const userSubscription = await db.query.subscriptions.findFirst({
            where: eq(subscriptions.userId, userId),
        });

        const tier = userSubscription?.tier || Subscription.FREE;

        // Get usage limits for the tier
        const limits = await db.query.usageLimits.findFirst({
            where: eq(usageLimits.tier, tier),
        });

        const maxLevels = limits?.maxLevels || 12; // Default 12 levels for free tier

        // Get current month's usage
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const currentUsage = await db.query.userUsage.findFirst({
            where: and(
                eq(userUsage.userId, userId),
                gte(userUsage.lastResetDate, startOfMonth)
            ),
        });

        const currentLevels = currentUsage?.levelsCompleted || 0;

        const remainingLevels = maxLevels - currentLevels;

        // User can proceed if they have both tokens and levels remaining
        const canProceed = remainingLevels > 0;

        return {
            canProceed,
            currentLevels,
            maxLevels,
            remainingLevels,
            message: canProceed
                ? undefined
                : `Usage limit exceeded. You've completed ${currentLevels} levels.`,
        };
    } catch (error) {
        console.error("Error checking usage limit:", error);
        // Default to allowing access if there's an error
        return {
            canProceed: true,
            currentLevels: 0,
            maxLevels: 12,
            remainingLevels: 12,
        };
    }
}

export async function updateUserUsage(userId: string, usage: TokenUsage): Promise<void> {
    try {
        // Get or create usage record for current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const existingUsage = await db.query.userUsage.findFirst({
            where: and(
                eq(userUsage.userId, userId),
                gte(userUsage.lastResetDate, startOfMonth)
            ),
        });

        if (existingUsage) {
            // Update existing usage
            await db.update(userUsage)
                .set({
                    levelsCompleted: existingUsage.levelsCompleted + 1, // Increment level count
                    updatedAt: new Date(),
                })
                .where(eq(userUsage.id, existingUsage.id));
        } else {
            // Create new usage record
            await db.insert(userUsage).values({
                userId,
                levelsCompleted: 1, // First level
                lastResetDate: startOfMonth,
            });
        }
    } catch (error) {
        console.error("Error updating user usage:", error);
    }
}

export async function resetMonthlyUsage(): Promise<void> {
    try {
        // Reset usage for all users at the start of each month
        // This could be run as a cron job
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        await db.update(userUsage)
            .set({
                tokensUsed: 0,
                levelsCompleted: 0,
                lastResetDate: startOfMonth,
                updatedAt: new Date(),
            })
            .where(gte(userUsage.lastResetDate, startOfMonth));
    } catch (error) {
        console.error("Error resetting monthly usage:", error);
    }
}
