"use client";

import { useClerk } from "@clerk/nextjs";
import { Coins, LayoutGrid, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";

interface Props {
  tokens: number;
}

export default function GlassmorphNavbar({ tokens }: Props) {
  const { signOut } = useClerk();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up")
    return null;

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-11/12 max-w-5xl -translate-x-1/2 rounded-full border border-gray-200 bg-white/20 shadow-lg saturate-150 backdrop-blur-lg dark:border-gray-900 dark:bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <Link href={"/"} className="hidden text-sm sm:block">
                <span className="text-md font-semibold text-gray-800 dark:text-gray-200">
                  Textual Games
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-1 font-mono">
              <Link href={"/my-games"}>
                <Button variant={"ghost"}>
                  <LayoutGrid />
                  My Games
                </Button>
              </Link>
              <Link href={"/profile"}>
                <Button variant={"ghost"}>
                  <User />
                  Profile
                </Button>
              </Link>
              <Link href={"/buy-tokens"}>
                <Button variant={"ghost"}>
                  <Coins />
                  {tokens}
                </Button>
              </Link>
              <Button variant={"ghost"} onClick={() => signOut()}>
                <LogOut />
                Log out
              </Button>
              <ModeToggle />
            </div>
          </div>
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:bg-black/20 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block size-6" aria-hidden="true" />
              ) : (
                <Menu className="block size-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3 font-mono">
            <div className="flex flex-col">
              <Link href={"/my-games"}>
                <Button variant={"ghost"}>My Games</Button>
              </Link>
              <Link href={"/profile"}>
                <Button variant={"ghost"}>Profile</Button>
              </Link>
              <Link href={"/buy-tokens"}>
                <Button variant={"ghost"}>
                  <Coins />
                  {tokens} Tokens
                </Button>
              </Link>
            </div>

            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
