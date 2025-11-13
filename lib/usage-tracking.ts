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

export async function checkUsageLimit(userId: string): Promise<UsageCheckResult> {
    // Always allow access - game is now free
    return {
        canProceed: true,
        currentLevels: 0,
        maxLevels: Infinity,
        remainingLevels: Infinity,
    };
}

export async function updateUserUsage(userId: string): Promise<void> {
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
                levelsCompleted: 0,
                lastResetDate: startOfMonth,
                updatedAt: new Date(),
            })
            .where(gte(userUsage.lastResetDate, startOfMonth));
    } catch (error) {
        console.error("Error resetting monthly usage:", error);
    }
}
