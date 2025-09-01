"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import db from "@/db/drizzle";
import { Subscription, subscriptions, user } from "@/db/schema";
import { auth } from "@/lib/auth";

import WelcomeEmail from "@/components/emails/welcome";
import { Resend } from "resend";
import { userSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

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
        with: {
            subscriptions: true,
        },
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

        await resend.emails.send({
            from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
            to: [email],
            subject: "Welcome to Textual Games",
            react: WelcomeEmail({ name: username }),
        });

        const user = await getUserByEmail(email);

        await db.insert(subscriptions).values({
            userId: user.id,
            polarProductId: "",
            slug: "",
            tier: Subscription.FREE,
        });

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

export const getUserTheme = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return null;
    }

    const userProfile = await db.query.user.findFirst({
        where: eq(user.id, session?.user?.id),
        with: {
            userConfigurations: true,
        },
    });

    if (!userProfile) {
        return null;
    }

    return userProfile.userConfigurations?.theme;
}

export const getUserProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("User not found");
    }

    const userProfile = await db.query.user.findFirst({
        where: eq(user.id, session?.user?.id),
        with: {
            userConfigurations: true,
            subscriptions: true,
        },
    });

    if (!userProfile) {
        throw new Error("User not found");
    }

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
            redirect: "/play/create-character",
        }
    } catch (e) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
        }
    }
}

