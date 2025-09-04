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

interface TextualGamesCancelEmailProps {
  userName: string;
}

const TextualGamesCancelEmail = (props: TextualGamesCancelEmailProps) => {
  const { userName } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your Textual Games Pro subscription has been cancelled.</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[32px] font-bold text-gray-900 m-0 mb-[8px]">
                🎮 Textual Games
              </Heading>
              <Text className="text-[18px] text-gray-600 m-0">
                Interactive Text Adventures
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 mb-[16px]">
                Subscription Cancelled, {userName} 😔
              </Heading>

              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                We&apos;re sorry to see you go! Your Textual Games Pro
                subscription has been successfully cancelled as requested.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Here&apos;s what happens next:
              </Text>

              {/* What Happens Next */}
              <Section className="bg-yellow-50 border border-solid border-yellow-200 p-[24px] mb-[24px]">
                <Text className="text-[16px] text-gray-800 mb-[12px] font-semibold">
                  ⚠️ Important Information:
                </Text>
                <Text className="text-[16px] text-gray-700 mb-[12px] leading-[24px]">
                  📅{" "}
                  <span className="font-semibold">
                    Access until October 3, 2025
                  </span>{" "}
                  - You can continue using Pro features until your current
                  billing period ends
                </Text>
                <Text className="text-[16px] text-gray-700 mb-[12px] leading-[24px]">
                  🔒 <span className="font-semibold">No future charges</span> -
                  Your card will not be charged again
                </Text>
                <Text className="text-[16px] text-gray-700 leading-[24px]">
                  💾 <span className="font-semibold">Your games are safe</span>{" "}
                  - All created games will remain accessible even after
                  cancellation
                </Text>
              </Section>

              {/* What You'll Lose */}
              <Section className="bg-gray-50 p-[24px] mb-[24px]">
                <Text className="text-[16px] text-gray-800 mb-[12px] font-semibold">
                  📋 After October 3, 2025, you&apos;ll lose access to:
                </Text>
                <Text className="text-[14px] text-gray-700 mb-[8px] leading-[20px]">
                  • All premium features
                </Text>
                <Text className="text-[14px] text-gray-700 mb-[8px] leading-[20px]">
                  • Unlimited game creation
                </Text>
                <Text className="text-[14px] text-gray-700 leading-[20px]">
                  • Unlimited play time
                </Text>
              </Section>

              {/* Reactivate Button */}
              <Section className="text-center mb-[32px]">
                <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                  Changed your mind? You can reactivate your subscription
                  anytime:
                </Text>
                <Button
                  href="https://textualgames.com/reactivate"
                  className="bg-green-600 text-white px-[32px] py-[12px] text-[16px] font-semibold no-underline box-border"
                >
                  Reactivate Subscription
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                We&apos;d love to know what we could have done better. If you
                have a moment, please share your feedback with us.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px]">
                Thank you for being part of the Textual Games community. If you
                need any help or have questions, reach out to us at{" "}
                <Link
                  href="mailto:support@textualgames.com"
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
              <Text className="text-[12px] text-gray-500 mb-[8px] m-0">
                123 Gaming Street, Digital City, DC 12345
              </Text>
              <Text className="text-[12px] text-gray-500 mb-[8px]">
                <Link
                  href="https://textualgames.com/feedback"
                  className="text-gray-500 underline"
                >
                  Share Feedback
                </Link>
                {" | "}
                <Link
                  href="https://textualgames.com/contact"
                  className="text-gray-500 underline"
                >
                  Contact Support
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

export default TextualGamesCancelEmail;
