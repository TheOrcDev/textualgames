"use client";

import { useEffect, useRef, useState } from "react";

import { Game, Level } from "@/db/schema";
import { UIMessage, useChat } from "@ai-sdk/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

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

import ChoicesSelect from "./choices-select";
import { ScrollArea } from "./ui/scroll-area";

interface AIChatProps {
  game: Game;
  initialMessages?: UIMessage[];
  level: Level;
}

const AIChat = ({ game, initialMessages, level }: AIChatProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: game.chatId,
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
          },
        }
      );

      setInput("");
    }
  };

  return (
    <Card>
      <CardHeader className="hidden"></CardHeader>
      <CardContent className="max-w-4xl mx-auto p-6 relative max-h-[700px] overflow-x-hidden overflow-y-auto">
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
                  <Message from={message.role} key={`${message.role}-${index}`}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <Response key={`${message.role}-${index}-${i}`}>
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
                                <ReasoningContent>{part.text}</ReasoningContent>
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
              className="rounded-none"
            />
            <PromptInputToolbar>
              <PromptInputTools className="rounded-none">
                <ChoicesSelect
                  choices={level.choices}
                  onChoiceSelected={(choice) => {
                    setInput(choice.text);
                  }}
                />
              </PromptInputTools>
              <PromptInputSubmit disabled={!input} status={status} />
            </PromptInputToolbar>
          </PromptInput>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AIChat;
