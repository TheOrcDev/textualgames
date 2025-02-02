"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import { useTheme } from "next-themes";

export const metadata: Metadata = {
  title: "Sign Up: Create Your Account on Textual Games",
  description:
    "Create your account on Textual Games. Start creating your own stories and adventures.",
};

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <main className="flex h-screen items-center justify-center pt-20 md:p-24">
      <SignUp
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
    </main>
  );
}
