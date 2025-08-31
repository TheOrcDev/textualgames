import Link from "next/link";

import { HomeIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./8bit/button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="retro mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="outline">
              <Link
                href="https://x.com/theorcdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="0.25"
                  className="size-5"
                  aria-label="twitter"
                >
                  <rect x="40" y="40" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="40" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="56" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="72" width="14" height="14" rx="1"></rect>
                  <rect x="104" y="88" width="14" height="14" rx="1"></rect>
                  <rect x="120" y="104" width="14" height="14" rx="1"></rect>
                  <rect x="136" y="120" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="136" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="152" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="184" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="200" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="200" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="168" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="184" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="168" width="14" height="14" rx="1"></rect>
                  <rect x="136" y="152" width="14" height="14" rx="1"></rect>
                  <rect x="120" y="136" width="14" height="14" rx="1"></rect>
                  <rect x="104" y="120" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="104" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="88" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="72" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="56" width="14" height="14" rx="1"></rect>
                  <rect x="136" y="104" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="88" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="40" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="200" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="88" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="72" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="56" width="14" height="14" rx="1"></rect>
                  <rect x="104" y="136" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="152" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="168" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="184" width="14" height="14" rx="1"></rect>
                </svg>
              </Link>
            </Button>

            <Button size="icon" variant="outline">
              <Link
                href="https://github.com/TheOrcDev/textualgames"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="0.25"
                  className="size-6"
                  aria-label="github"
                >
                  <rect x="200" y="80" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="96" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="104" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="136" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="120" y="48" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="104" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="136" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="120" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="64" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="80" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="96" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="112" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="128" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="80" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="96" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="112" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="128" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="80" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="96" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="112" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="80" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="80" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="128" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="136" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="104" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="128" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="128" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="160" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="160" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="192" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="176" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="176" width="14" height="14" rx="1"></rect>
                  <rect x="56" y="160" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="160" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="176" width="14" height="14" rx="1"></rect>
                  <rect x="88" y="176" width="14" height="14" rx="1"></rect>
                  <rect x="152" y="192" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="192" width="14" height="14" rx="1"></rect>
                  <rect x="72" y="192" width="14" height="14" rx="1"></rect>
                  <rect x="168" y="176" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="176" width="14" height="14" rx="1"></rect>
                  <rect x="184" y="160" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="160" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="128" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="40" y="144" width="14" height="14" rx="1"></rect>
                  <rect x="200" y="112" width="14" height="14" rx="1"></rect>
                </svg>
              </Link>
            </Button>
          </div>

          <h3 className={cn("flex justify-center sm:justify-start")}>
            Textual Games
          </h3>
        </div>

        <p className="text-center  text-sm lg:text-right">
          Copyright &copy; {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
