"use server";

import db from "@/db/drizzle";
import { InsertUserConfiguration, userConfigurations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserSession } from "./users";

export const saveConfiguration = async (configuration: InsertUserConfiguration) => {
    try {
        const { user } = await getUserSession();
        const existingConfiguration = await db.query.userConfigurations.findFirst({
            where: eq(userConfigurations.userId, user.id),
        });

        if (existingConfiguration) {
            await db.update(userConfigurations).set({
                theme: configuration.theme,
            }).where(eq(userConfigurations.id, existingConfiguration.id));
        } else {
            await db.insert(userConfigurations).values({
                userId: user.id,
                theme: configuration.theme,
            });
        }
    } catch (error) {
        throw error;
    }
}