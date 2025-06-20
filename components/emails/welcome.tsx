import * as React from "react";

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[12px] shadow-lg max-w-[600px] mx-auto overflow-hidden">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-center py-[28px] px-[32px]">
              <Img
                src="https://textualgames.com/textual-games-logo.png"
                alt="Textual Games Logo"
                width="150"
                height="40"
                className="h-auto object-cover mx-auto"
              />
              <Heading className="text-black text-[36px] font-bold m-0 mb-[12px]">
                Welcome to Textual Games!
              </Heading>
              <Text className="text-[18px] m-0">
                Hi {name}, your storytelling adventure begins now
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[32px]">
              <Text className="text-gray-700 text-[18px] leading-[26px] mb-[32px] text-center m-0">
                Get ready to dive into a world where{" "}
                <strong>your imagination shapes reality</strong>. Create unique
                characters, craft compelling narratives, and experience stories
                like never before.
              </Text>

              {/* Feature Cards */}
              <Row className="my-[10px]">
                <Column className="w-full">
                  <div className="bg-purple-50 border border-purple-200 rounded-[8px] p-[24px] mb-[16px]">
                    <div className="text-[32px] mb-[10px] text-center">✨</div>
                    <Heading className="text-purple-800 text-[18px] font-semibold mb-[8px] m-0 text-center">
                      Create Characters
                    </Heading>
                    <Text className="text-purple-600 text-[14px] leading-[20px] m-0 text-center">
                      Design unique personalities with rich backstories and
                      distinct traits
                    </Text>
                  </div>
                </Column>
              </Row>

              <Row className="my-[10px]">
                <Column className="w-full">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-[8px] p-[24px] mb-[16px]">
                    <div className="text-[32px] mb-[12px] text-center">📖</div>
                    <Heading className="text-indigo-800 text-[18px] font-semibold mb-[8px] m-0 text-center">
                      Craft Stories
                    </Heading>
                    <Text className="text-indigo-600 text-[14px] leading-[20px] m-0 text-center">
                      Build immersive narratives that adapt and evolve with your
                      choices
                    </Text>
                  </div>
                </Column>
              </Row>

              <Row className="my-[12px]">
                <Column className="w-full">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-[8px] p-[24px]">
                    <div className="text-[32px] mb-[12px] text-center">🌟</div>
                    <Heading className="text-emerald-800 text-[18px] font-semibold mb-[8px] m-0 text-center">
                      Share & Discover
                    </Heading>
                    <Text className="text-emerald-600 text-[14px] leading-[20px] m-0 text-center">
                      Connect with other storytellers and explore amazing
                      community creations
                    </Text>
                  </div>
                </Column>
              </Row>

              {/* CTA Section */}
              <div className="text-center mb-[32px] flex flex-col gap-10">
                <Text className="text-gray-700 text-[16px] m-0">
                  Ready to create your first masterpiece?
                </Text>
                <div className="text-center">
                  <Button
                    href="https://textualgames.com/play/create-character"
                    className="bg-purple-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                  >
                    Start Your First Story
                  </Button>
                </div>
              </div>

              <Hr className="border-gray-200 my-[32px]" />

              {/* Getting Started Tips */}
              <div className="bg-gray-50 rounded-[8px] p-[24px]">
                <Heading className="text-gray-800 text-[20px] font-semibold pb-[20px] m-0 text-center">
                  Quick Start Tips
                </Heading>
                <Text className="text-gray-600 text-[14px] leading-[22px] m-0 mb-[12px]">
                  <strong>1. Start Simple:</strong> Begin with a basic character
                  concept and let it evolve naturally
                </Text>
                <Text className="text-gray-600 text-[14px] leading-[22px] m-0 mb-[12px]">
                  <strong>2. Explore Templates:</strong> Use our story templates
                  to get inspired and learn the ropes
                </Text>
                <Text className="text-gray-600 text-[14px] leading-[22px] m-0 mb-[12px]">
                  <strong>3. Join the Community:</strong> Connect with fellow
                  creators for feedback and collaboration
                </Text>
                <Text className="text-gray-600 text-[14px] leading-[22px] m-0">
                  <strong>4. Have Fun:</strong> Remember, there are no wrong
                  choices in storytelling!
                </Text>
              </div>

              {/* Support Section */}
              <div className="text-center mt-[32px]">
                <Text className="text-gray-600 text-[14px] mb-[16px] m-0">
                  Need help getting started? We&apos;re here for you!
                </Text>
                <div className="text-center">
                  <Button
                    href="https://textualgames.com/support"
                    className="bg-gray-600 text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-medium no-underline box-border inline-block"
                  >
                    Get Support
                  </Button>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-[32px] py-[24px] text-center border-t border-gray-200">
              <Text className="text-gray-500 text-[14px] leading-[20px] m-0 mb-[8px]">
                Play your unique story!
                <br />
                The Textual Games Team
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] m-0">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>{" "}
                | © 2025 Textual Games. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
