import { Press_Start_2P } from "next/font/google";

import { cn } from "@/lib/utils";
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h3
          className={cn(
            pressStart2P.className,
            "flex justify-center sm:justify-start"
          )}
        >
          Textual Games
        </h3>

        <p className="text-center font-mono text-sm lg:text-right">
          Copyright &copy; {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
