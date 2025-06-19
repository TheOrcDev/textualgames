"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";

import { userSchema } from "./schemas";

export const getUserById = async (id: string) => {
    const [currentUser] = await db.select().from(user).where(eq(user.id, id));

    return currentUser;
}

export const getUserByEmail = async (email: string) => {
    const [currentUser] = await db.select().from(user).where(eq(user.email, email));

    return currentUser;
}

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect("/login");
    }

    const currentUser = await db.query.user.findFirst({
        where: eq(user.id, session?.user?.id),
    });

    if (!currentUser) {
        redirect("/login");
    }

    return {
        ...session,
        user: currentUser,
    };
}

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })

        return {
            success: true,
            message: "Signed in successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const signUp = async (email: string, password: string, username: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username
            }
        })

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const getUserProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("User not found");
    }

    const [userProfile] = await db.select().from(user).where(eq(user.id, session?.user?.id));

    return userProfile;
}

export const updateProfile = async (data: z.infer<typeof userSchema>) => {
    const session = await getUserSession();

    try {
        await db.update(user).set(data).where(eq(user.id, session?.user?.id));

        return {
            values: {
                text: "Successfully updated profile.",
            },
            redirect: "/dashboard/meal-planner",
        }
    } catch (e) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
        }
    }
}

