"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Game, Level, Subscription } from "@/db/schema";
import { UIMessage, useChat } from "@ai-sdk/react";

import { Card, CardContent, CardHeader } from "@/components/ui/8bit/card";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Response } from "@/components/ai-elements/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/source";

import { Button } from "./ui/8bit/button";
import { ScrollArea } from "./ui/8bit/scroll-area";

interface AIChatProps {
  game: Game;
  initialMessages?: UIMessage[];
  level: Level;
  isSubscriptionValid?: boolean;
}

const AIChat = ({
  game,
  initialMessages,
  level,
  isSubscriptionValid,
}: AIChatProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: game.id,
    messages: initialMessages ?? [],
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input },
        {
          body: {
            game,
            userId: game.userId,
          },
        }
      );

      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {level?.image && (
        <Image src={level.image} alt="Game Image" width={500} height={500} />
      )}
      <Card>
        <CardHeader className="hidden"></CardHeader>
        <CardContent className="max-w-4xl mx-auto relative max-h-[600px] md:max-h-[700px] overflow-x-hidden overflow-y-auto md:p-6">
          <ScrollArea>
            <Conversation>
              <ConversationContent>
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`}>
                    {message.role === "assistant" && (
                      <Sources>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "source-url":
                              return (
                                <>
                                  <SourcesTrigger
                                    count={
                                      message.parts.filter(
                                        (part) => part.type === "source-url"
                                      ).length
                                    }
                                  />
                                  <SourcesContent
                                    key={`${message.role}-${index}-${i}`}
                                  >
                                    <Source
                                      key={`${message.role}-${index}-${i}`}
                                      href={part.url}
                                      title={part.url}
                                    />
                                  </SourcesContent>
                                </>
                              );
                          }
                        })}
                      </Sources>
                    )}
                    <Message
                      from={message.role}
                      key={`${message.role}-${index}`}
                    >
                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <Response
                                  key={`${message.role}-${index}-${i}`}
                                  className="text-[9px] md:text-sm"
                                >
                                  {part.text}
                                </Response>
                              );
                            case "reasoning":
                              return (
                                <Reasoning
                                  key={`${message.role}-${index}-${i}`}
                                  className="w-full"
                                  isStreaming={status === "streaming"}
                                >
                                  <ReasoningTrigger />
                                  <ReasoningContent>
                                    {part.text}
                                  </ReasoningContent>
                                </Reasoning>
                              );
                            default:
                              return null;
                          }
                        })}
                      </MessageContent>
                    </Message>
                  </div>
                ))}
                {status === "submitted" && <Loader />}
                {/* Invisible div to scroll to */}
                <div ref={messagesEndRef} />
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <PromptInput onSubmit={handleSubmit} className="mt-4 rounded-none">
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="rounded-none text-[9px] md:text-sm"
                placeholder="What do you do?"
              />
              <PromptInputToolbar>
                {/* <PromptInputTools className="rounded-none">
                <ChoicesSelect
                  choices={level.choices}
                  onChoiceSelected={(choice) => {
                    setInput(choice.text);
                  }}
                />
              </PromptInputTools> */}
                <PromptInputSubmit disabled={!input} status={status} />
              </PromptInputToolbar>
            </PromptInput>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
