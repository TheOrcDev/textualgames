import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <CircuitBackground
      opacity={0.08}
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10"
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-mono text-sm font-medium uppercase tracking-widest text-foreground"
        >
          <BrandLogo size="sm" />
        </Link>
        <SignupForm />
      </div>
    </CircuitBackground>
  );
}
