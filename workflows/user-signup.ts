import { FatalError, sleep } from "workflow";
import { Resend } from "resend";

import db from "@/db/drizzle";
import { Subscription, subscriptions } from "@/db/schema";

import WelcomeEmail from "@/components/emails/welcome";

export async function handleUserSignup(
  userId: string,
  email: string,
  username: string
) {
  "use workflow";

  await createFreeSubscription(userId);
  await sendWelcomeEmail(email, username);

  await sleep("3d");
  await sendOnboardingEmail(email, username);

  return { userId, status: "onboarded" };
}

async function createFreeSubscription(userId: string) {
  "use step";

  await db.insert(subscriptions).values({
    userId,
    polarProductId: "",
    slug: "",
    tier: Subscription.FREE,
  });
}

async function sendWelcomeEmail(email: string, username: string) {
  "use step";

  if (!email.includes("@")) {
    throw new FatalError("Invalid email address");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
    to: [email],
    subject: "Welcome to Textual Games",
    react: WelcomeEmail({ name: username }),
  });
}

async function sendOnboardingEmail(email: string, username: string) {
  "use step";

  if (!email.includes("@")) {
    throw new FatalError("Invalid email address");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
    to: [email],
    subject: "How's your adventure going?",
    react: WelcomeEmail({ name: username }),
  });
}
