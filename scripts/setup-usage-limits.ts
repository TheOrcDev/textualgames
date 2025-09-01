import db from "../db/drizzle";
import { Subscription, usageLimits } from "../db/schema";

async function setupUsageLimits() {
    try {
        console.log("Setting up usage limits...");

        // Insert default usage limits
        await db.insert(usageLimits).values([
            {
                tier: Subscription.FREE,
                maxLevels: 12, // 12 levels per month
                maxTokens: 10000, // 10K tokens per month
                features: ["chat", "basic_games"],
            },
            {
                tier: Subscription.PRO,
                maxLevels: 999, // Effectively unlimited levels
                maxTokens: 100000, // 100K tokens per month
                features: ["chat", "unlimited_games", "priority_support"],
            },
        ]);

        console.log("Usage limits set up successfully!");
    } catch (error) {
        console.error("Error setting up usage limits:", error);
    } finally {
        process.exit(0);
    }
}

setupUsageLimits();
