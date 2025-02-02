"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import { useTheme } from "next-themes";

export const metadata: Metadata = {
  title: "Sign In: Access Your Account on Textual Games",
  description:
    "Sign in to your account on Textual Games. Continue creating and playing your stories.",
};

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <main className="flex h-screen items-center justify-center pt-20 md:p-24">
      <SignIn
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
    </main>
  );
}
