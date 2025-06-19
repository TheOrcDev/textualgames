import Image from "next/image";
import Link from "next/link";

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              width={50}
              height={50}
              src={"/textual-games-logo.png"}
              alt="Textual Games Logo"
              priority
            />
          </div>
          Textual Games
        </Link>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
