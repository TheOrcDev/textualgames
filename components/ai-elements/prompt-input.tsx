"use client";

import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react";
import { Children } from "react";

import type { ChatStatus } from "ai";
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type PromptInputProps = HTMLAttributes<HTMLFormElement>;

export const PromptInput = ({ className, ...props }: PromptInputProps) => (
  <form
    className={cn(
      "w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm",
      className
    )}
    {...props}
  />
);

export type PromptInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};

export const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = "What do you do?",
  minHeight = 48,
  maxHeight = 164,
  ...props
}: PromptInputTextareaProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      // Don't submit if IME composition is in progress
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.shiftKey) {
        // Allow newline
        return;
      }

      // Submit on Enter (without Shift)
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Textarea
      className={cn(
        "w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0",
        "field-sizing-content max-h-[6lh] bg-transparent dark:bg-transparent",
        "focus-visible:ring-0",
        className
      )}
      name="message"
      onChange={(e) => {
        onChange?.(e);
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  );
};

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputToolbar = ({
  className,
  ...props
}: PromptInputToolbarProps) => (
  <div
    className={cn("flex items-center justify-between p-1", className)}
    {...props}
  />
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props} />
);

export type PromptInputButtonProps = ComponentProps<typeof Button>;

export const PromptInputButton = ({
  variant = "ghost",
  className,
  size,
  ...props
}: PromptInputButtonProps) => {
  const newSize =
    (size ?? Children.count(props.children) > 1) ? "default" : "icon";

  return (
    <Button
      className={cn(
        "shrink-0 gap-1.5 rounded-lg",
        variant === "ghost" && "text-muted-foreground",
        newSize === "default" && "px-3",
        className
      )}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
};

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus;
};

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  let Icon = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="0.25"
      className="size-10"
      aria-label="send"
    >
      <rect x="144" y="136" width="14" height="14" rx="1"></rect>
      <rect x="128" y="152" width="14" height="14" rx="1"></rect>
      <rect x="112" y="72" width="14" height="14" rx="1"></rect>
      <rect x="112" y="168" width="14" height="14" rx="1"></rect>
      <rect x="96" y="168" width="14" height="14" rx="1"></rect>
      <rect x="96" y="72" width="14" height="14" rx="1"></rect>
      <rect x="96" y="72" width="14" height="14" rx="1"></rect>
      <rect x="80" y="152" width="14" height="14" rx="1"></rect>
      <rect x="160" y="120" width="14" height="14" rx="1"></rect>
      <rect x="144" y="104" width="14" height="14" rx="1"></rect>
      <rect x="128" y="88" width="14" height="14" rx="1"></rect>
      <rect x="80" y="136" width="14" height="14" rx="1"></rect>
      <rect x="80" y="104" width="14" height="14" rx="1"></rect>
      <rect x="80" y="120" width="14" height="14" rx="1"></rect>
      <rect x="80" y="88" width="14" height="14" rx="1"></rect>
    </svg>
  );

  if (status === "submitted") {
    Icon = (
      <svg
        width="50"
        height="50"
        viewBox="0 0 256 256"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="0.25"
        className="animate-spin size-10"
        aria-label="loading"
      >
        <rect x="96" y="32" width="14" height="14" rx="1"></rect>
        <rect x="48" y="32" width="14" height="14" rx="1"></rect>
        <rect x="32" y="144" width="14" height="14" rx="1"></rect>
        <rect x="32" y="32" width="14" height="14" rx="1"></rect>
        <rect x="32" y="176" width="14" height="14" rx="1"></rect>
        <rect x="32" y="160" width="14" height="14" rx="1"></rect>
        <rect x="32" y="128" width="14" height="14" rx="1"></rect>
        <rect x="208" y="112" width="14" height="14" rx="1"></rect>
        <rect x="64" y="208" width="14" height="14" rx="1"></rect>
        <rect x="144" y="32" width="14" height="14" rx="1"></rect>
        <rect x="208" y="160" width="14" height="14" rx="1"></rect>
        <rect x="32" y="192" width="14" height="14" rx="1"></rect>
        <rect x="48" y="208" width="14" height="14" rx="1"></rect>
        <rect x="176" y="32" width="14" height="14" rx="1"></rect>
        <rect x="208" y="144" width="14" height="14" rx="1"></rect>
        <rect x="32" y="48" width="14" height="14" rx="1"></rect>
        <rect x="32" y="96" width="14" height="14" rx="1"></rect>
        <rect x="208" y="96" width="14" height="14" rx="1"></rect>
        <rect x="32" y="112" width="14" height="14" rx="1"></rect>
        <rect x="208" y="80" width="14" height="14" rx="1"></rect>
        <rect x="32" y="64" width="14" height="14" rx="1"></rect>
        <rect x="208" y="64" width="14" height="14" rx="1"></rect>
        <rect x="32" y="80" width="14" height="14" rx="1"></rect>
        <rect x="208" y="128" width="14" height="14" rx="1"></rect>
        <rect x="120" y="120" width="14" height="14" rx="1"></rect>
        <rect x="208" y="48" width="14" height="14" rx="1"></rect>
        <rect x="208" y="176" width="14" height="14" rx="1"></rect>
        <rect x="208" y="192" width="14" height="14" rx="1"></rect>
        <rect x="176" y="208" width="14" height="14" rx="1"></rect>
        <rect x="160" y="32" width="14" height="14" rx="1"></rect>
        <rect x="208" y="32" width="14" height="14" rx="1"></rect>
        <rect x="64" y="32" width="14" height="14" rx="1"></rect>
        <rect x="192" y="32" width="14" height="14" rx="1"></rect>
        <rect x="208" y="208" width="14" height="14" rx="1"></rect>
        <rect x="192" y="208" width="14" height="14" rx="1"></rect>
        <rect x="80" y="32" width="14" height="14" rx="1"></rect>
        <rect x="112" y="32" width="14" height="14" rx="1"></rect>
        <rect x="160" y="208" width="14" height="14" rx="1"></rect>
        <rect x="128" y="32" width="14" height="14" rx="1"></rect>
        <rect x="144" y="208" width="14" height="14" rx="1"></rect>
        <rect x="32" y="208" width="14" height="14" rx="1"></rect>
        <rect x="80" y="208" width="14" height="14" rx="1"></rect>
        <rect x="96" y="208" width="14" height="14" rx="1"></rect>
        <rect x="112" y="208" width="14" height="14" rx="1"></rect>
        <rect x="128" y="208" width="14" height="14" rx="1"></rect>
      </svg>
    );
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />;
  }

  return (
    <Button
      className={cn("gap-1.5 rounded-lg", className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};

export type PromptInputModelSelectProps = ComponentProps<typeof Select>;

export const PromptInputModelSelect = (props: PromptInputModelSelectProps) => (
  <Select {...props} />
);

export type PromptInputModelSelectTriggerProps = ComponentProps<
  typeof SelectTrigger
>;

export const PromptInputModelSelectTrigger = ({
  className,
  ...props
}: PromptInputModelSelectTriggerProps) => (
  <SelectTrigger
    className={cn(
      "border-none bg-transparent font-medium text-muted-foreground shadow-none transition-colors",
      'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
      className
    )}
    {...props}
  />
);

export type PromptInputModelSelectContentProps = ComponentProps<
  typeof SelectContent
>;

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: PromptInputModelSelectContentProps) => (
  <SelectContent className={cn(className)} {...props} />
);

export type PromptInputModelSelectItemProps = ComponentProps<typeof SelectItem>;

export const PromptInputModelSelectItem = ({
  className,
  ...props
}: PromptInputModelSelectItemProps) => (
  <SelectItem className={cn(className)} {...props} />
);

export type PromptInputModelSelectValueProps = ComponentProps<
  typeof SelectValue
>;

export const PromptInputModelSelectValue = ({
  className,
  ...props
}: PromptInputModelSelectValueProps) => (
  <SelectValue className={cn(className)} {...props} />
);
