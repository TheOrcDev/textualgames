"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { Game, Level } from "@/db/schema";
import { UIMessage, useChat } from "@ai-sdk/react";
import { WorkflowChatTransport } from "@workflow/ai";

import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

import { ScrollArea } from "./ui/scroll-area";

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

  const runIdStorageKey = `workflow-run-id:${game.id}`;

  const activeRunId = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(runIdStorageKey) ?? undefined;
  }, [runIdStorageKey]);

  const { messages, sendMessage, status } = useChat({
    id: game.id,
    messages: initialMessages ?? [],
    resume: Boolean(activeRunId),
    transport: new WorkflowChatTransport({
      api: "/api/chat",
      onChatSendMessage: (response) => {
        const workflowRunId = response.headers.get("x-workflow-run-id");
        if (workflowRunId) {
          localStorage.setItem(runIdStorageKey, workflowRunId);
        }
      },
      onChatEnd: () => {
        localStorage.removeItem(runIdStorageKey);
      },
      prepareReconnectToStreamRequest: ({ api, ...rest }) => {
        const runId = localStorage.getItem(runIdStorageKey);
        if (!runId) throw new Error("No active workflow run ID found");
        return {
          ...rest,
          api: `/api/chat/${encodeURIComponent(runId)}/stream`,
        };
      },
    }),
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
        },
      );

      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {level?.image && (
        <Image
          src={level.image}
          alt="Game Image"
          width={500}
          height={500}
          className="rounded border border-primary/30 shadow-[0_0_24px_color-mix(in_oklch,var(--glow)_18%,transparent)]"
        />
      )}
      <Card className="relative w-full max-w-4xl overflow-hidden border-primary/30 bg-card/85 backdrop-blur">
        <GridScanOverlay gridSize={86} scanSpeed={18} />
        <div className="relative">
          <UplinkHeader
            leftText={game.character?.name || "ACTIVE STORY"}
            rightText={status === "streaming" ? "STREAMING" : "READY"}
          />
          <StatusBar
            leftContent={
              <>
                <span>{game.genre}</span>
                <span>Level {level?.level || "current"}</span>
              </>
            }
            rightContent={<span>{messages.length} messages</span>}
          />
        </div>
        <CardHeader className="hidden"></CardHeader>
        <CardContent className="relative mx-auto max-h-[600px] max-w-4xl overflow-x-hidden overflow-y-auto md:max-h-[700px] md:p-6">
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
                                        (part) => part.type === "source-url",
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

            <PromptInput
              onSubmit={handleSubmit}
              className="mt-4 rounded border-primary/30 bg-background/80"
            >
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="font-mono text-[9px] md:text-sm"
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
