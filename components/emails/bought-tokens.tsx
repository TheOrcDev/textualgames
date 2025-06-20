import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface BoughtTokensProps {
  tokens: number;
}

const BoughtTokens = ({ tokens }: BoughtTokensProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[10px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto overflow-hidden">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-center py-[48px] px-[32px]">
              <div className="text-[48px] mb-[36px]">🎉</div>
              <Heading className="text-white text-[32px] font-bold m-0">
                Congratulations!
              </Heading>
              <Text className="text-[18px] m-0">
                Your token purchase was successful!
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[20px]">
              <div className="bg-emerald-50 border border-emerald-200 rounded-[8px] p-[24px] text-center mb-[32px]">
                <Text className="text-[24px] font-bold text-emerald-800 m-0 mb-[8px]">
                  {tokens} Tokens
                </Text>
                <Text className="text-emerald-600 text-[16px] m-0">
                  Successfully added to your account
                </Text>
              </div>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[24px] text-center">
                You&apos;re all set to unleash your creativity! Your tokens are
                ready to be used for creating amazing, unique stories that only
                you can tell.
              </Text>

              <div className="text-center mb-[32px]">
                <Button
                  href="https://textualgames.com/play/create-character"
                  className="bg-emerald-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-emerald-700"
                >
                  Start Creating Stories
                </Button>
              </div>

              <Hr className="border-gray-200 my-[12px]" />

              <div className="bg-gray-50 rounded-[8px] p-[24px]">
                <Heading className="text-gray-800 text-[18px] font-semibold mb-[16px] m-0">
                  What&apos;s Next?
                </Heading>
                <Text className="text-gray-600 text-[14px] leading-[20px] m-0 mb-[12px]">
                  • Access your dashboard to view your token balance
                </Text>
                <Text className="text-gray-600 text-[14px] leading-[20px] m-0 mb-[12px]">
                  • Browse our story templates to get inspired
                </Text>
                <Text className="text-gray-600 text-[14px] leading-[20px] m-0">
                  • Start creating your first unique story today
                </Text>
              </div>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-[32px] py-[24px] text-center border-t border-gray-200">
              <Text className="text-gray-500 text-[12px] leading-[16px] m-0 mb-[8px]">
                Textual Games
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] m-0">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>{" "}
                | © 2025 Textual Games
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BoughtTokens;
