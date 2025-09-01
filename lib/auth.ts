import { checkout, polar, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

import ForgotPasswordEmail from "@/components/emails/forgot-password";
import db from "@/db/drizzle";
import { schema, Subscription } from "@/db/schema";
import { updateSubscription } from "@/server/subscriptions";

const resend = new Resend(process.env.RESEND_API_KEY);

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: process.env.APP_ENV === "production" ? "production" : "sandbox"
});


export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: [user.email],
                subject: "Reset your password",
                react: ForgotPasswordEmail({ resetLink: url, username: user.name }),
            });
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema
    }),
    plugins: [polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
            checkout({
                products: [{ productId: "533c4351-04d5-4739-a465-e1883307e5df", slug: "pro" }],
                successUrl: "/play/payment",
                authenticatedUsersOnly: true,
            }),
            portal(),
            usage(),
            webhooks({
                secret: process.env.POLAR_WEBHOOK_SECRET!,
                onOrderPaid: async (payload) => {
                    if (payload.data.paid) {
                        await updateSubscription(
                            payload.data.customer.externalId as string,
                            Subscription.PRO
                        );
                    }
                }
            })
        ],
    }), nextCookies()],
});
