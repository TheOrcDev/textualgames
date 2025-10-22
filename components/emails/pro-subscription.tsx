import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface TextualGamesProEmailProps {
  userName: string;
}

const date = Date.now() + 30 * 24 * 60 * 60 * 1000;

const TextualGamesProEmail = (props: TextualGamesProEmailProps) => {
  const { userName } = props;

  // Calculate next billing date outside of render
  const nextBillingDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Welcome to Textual Games Pro! Your subscription is now active.
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[32px] font-bold text-gray-900 m-0 mb-[8px]">
                Textual Games
              </Heading>
              <Text className="text-[18px] text-gray-600 m-0">
                Create Your Story
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 mb-[16px]">
                Welcome to Pro, {userName}!
              </Heading>

              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                Congratulations! Your Textual Games Pro subscription is now
                active. You now have unlimited access to create and play
                text-based adventures without any restrictions.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Here&apos;s what you&apos;ve unlocked with Pro:
              </Text>

              {/* Features List */}
              <Section className="bg-gray-50 p-[24px] mb-[24px]">
                <Text className="text-[16px] text-gray-800 mb-[12px] font-semibold">
                  ✨ Pro Benefits Now Available:
                </Text>
                <Text className="text-[16px] text-gray-700 mb-[12px] leading-[24px]">
                  <span className="font-semibold">
                    Get access to all features
                  </span>{" "}
                  - Every tool and option at your fingertips
                </Text>
                <Text className="text-[16px] text-gray-700 mb-[12px] leading-[24px]">
                  <span className="font-semibold">Create unlimited games</span>{" "}
                  - Build as many adventures as your imagination allows
                </Text>
                <Text className="text-[16px] text-gray-700 leading-[24px]">
                  <span className="font-semibold">Play how much you want</span>{" "}
                  - No time limits, no restrictions, just pure gaming
                </Text>
              </Section>

              {/* Subscription Details */}
              <Section className="border border-solid border-gray-200 p-[20px] mb-[24px]">
                <Text className="text-[16px] font-semibold text-gray-900 mb-[12px]">
                  Subscription Details:
                </Text>
                <Text className="text-[14px] text-gray-700 mb-[4px]">
                  Plan: <span className="font-semibold">Pro</span>
                </Text>
                <Text className="text-[14px] text-gray-700 mb-[4px]">
                  Billing: <span className="font-semibold">$12.00 monthly</span>
                </Text>
                <Text className="text-[14px] text-gray-700">
                  Next billing date:{" "}
                  <span className="font-semibold">{nextBillingDate}</span>
                </Text>
              </Section>

              {/* CTA Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href="https://textualgames.com/play"
                  className="bg-blue-600 text-white px-[32px] py-[12px] text-[16px] font-semibold no-underline box-border"
                >
                  Start Creating & Playing Now
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                Ready to unleash your creativity? Your unlimited gaming
                experience starts now in your dashboard.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px]">
                If you have any questions or need assistance, our support team
                is here to help at{" "}
                <Link
                  href="mailto:theorcdev@gmail.com"
                  className="text-blue-600 underline"
                >
                  support@textualgames.com
                </Link>
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 mb-[8px]">
                Textual Games Inc.
              </Text>

              <Text className="text-[12px] text-gray-500 mb-[8px]">
                <Link
                  href="https://textualgames.com/unsubscribe"
                  className="text-gray-500 underline"
                >
                  Unsubscribe
                </Link>
                {" | "}
                <Link
                  href="https://textualgames.com/manage-subscription"
                  className="text-gray-500 underline"
                >
                  Manage Subscription
                </Link>
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                © 2025 Textual Games. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TextualGamesProEmail;
