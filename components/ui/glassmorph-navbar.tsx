"use client";

import { useState } from "react";

import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Coins, LayoutGrid, LogOut, Menu, User, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { ModeSwitcher } from "../mode-switcher";
import { Button } from "./button";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface Props {
  tokens: number;
}

export default function GlassmorphNavbar({ tokens }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="p-14">
      <nav
        className={`fixed left-1/2 top-4 z-50 w-11/12 max-w-5xl -translate-x-1/2 border border-gray-200 bg-white/20 shadow-lg saturate-150 backdrop-blur-lg dark:border-gray-900 dark:bg-black/20 ${
          isOpen ? "rounded-sm" : "rounded-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <Link
                  href={"/"}
                  className={cn(
                    pressStart2P.className,
                    "text-sm flex items-center gap-2"
                  )}
                >
                  <Image
                    width={50}
                    height={50}
                    src={"/textual-games-logo.png"}
                    alt="Textual Games Logo"
                    priority
                  />
                  <span className="text-xs lg:text-md font-semibold text-gray-800 dark:text-gray-200 hidden sm:block">
                    Textual Games
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center gap-1 font-mono">
                <Link href={"/play/my-games"}>
                  <Button variant={"ghost"}>
                    <LayoutGrid />
                    My Games
                  </Button>
                </Link>

                <Link href={"/play/profile"}>
                  <Button variant={"ghost"}>
                    <User />
                    Profile
                  </Button>
                </Link>

                <Link href={"/play/buy-tokens"}>
                  <Button variant={"ghost"}>
                    <Coins />
                    {tokens}
                  </Button>
                </Link>

                <Button variant={"ghost"} onClick={handleSignOut}>
                  <LogOut />
                  Log out
                </Button>
                <ModeSwitcher />
              </div>
            </div>
            <div className="md:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant={"ghost"}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-white dark:bg-black/20 dark:text-gray-200"
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
                <Link href={"/play/my-games"}>
                  <Button variant={"ghost"}>
                    <LayoutGrid />
                    My Games
                  </Button>
                </Link>
                <Link href={"/play/profile"}>
                  <Button variant={"ghost"}>
                    <User />
                    Profile
                  </Button>
                </Link>
                <Link href={"/play/buy-tokens"}>
                  <Button variant={"ghost"}>
                    <Coins />
                    {tokens} Tokens
                  </Button>
                </Link>
              </div>

              <ModeSwitcher />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
