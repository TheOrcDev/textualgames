"use client";

import {
  ChevronDown,
  Gamepad2,
  LogOut,
  Palette,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { saveConfiguration } from "@/server/configurations";

import { authClient } from "@/lib/auth-client";
import { Theme } from "@/lib/themes";
import { themes } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useThemeConfig } from "./active-theme";
import { navItems } from "./header";

export function UserDropdown() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const user = authClient.useSession();
  const displayName =
    user.data?.user?.name || user.data?.user?.email || "Operator";
  const fallbackInitial = displayName.slice(0, 1).toUpperCase();

  const { activeTheme, setActiveTheme } = useThemeConfig();

  const handleThemeChange = async (theme: Theme) => {
    if (!user.data?.user?.id) {
      return;
    }

    await saveConfiguration({
      userId: user.data?.user?.id,
      theme: theme,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded border border-primary/35 bg-card/70 px-2.5 pr-3 font-mono text-[10px] uppercase tracking-widest text-foreground shadow-[0_0_16px_color-mix(in_oklch,var(--glow)_14%,transparent)] transition-all hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Open account menu"
        >
          <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)] opacity-70" />
          <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/60" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/60" />
          <Avatar className="relative size-7 rounded border border-primary/45 bg-background/80">
            <AvatarImage
              className="object-cover"
              src={user.data?.user?.image || ""}
              alt={displayName}
            />
            <AvatarFallback className="bg-primary/10 font-display text-[10px] font-black text-primary">
              {fallbackInitial}
            </AvatarFallback>
          </Avatar>
          <span className="relative hidden min-w-0 flex-col items-start leading-none lg:flex">
            <span className="text-[8px] tracking-[0.28em] text-primary">
              Operator
            </span>
            <span className="mt-1 max-w-28 truncate text-[10px] text-foreground/80">
              {displayName}
            </span>
          </span>
          <ChevronDown className="relative size-3.5 text-primary transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded border-primary/35 bg-background/95 p-1.5 font-mono text-xs uppercase tracking-wider shadow-[0_0_28px_color-mix(in_oklch,var(--glow)_18%,transparent)] backdrop-blur-xl"
      >
        <div className="relative mb-1 overflow-hidden rounded border border-primary/25 bg-card/70 px-3 py-2.5">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)]" />
          <div className="relative flex items-center gap-2.5">
            <Avatar className="size-8 rounded border border-primary/45 bg-background/80">
              <AvatarImage
                className="object-cover"
                src={user.data?.user?.image || ""}
                alt={displayName}
              />
              <AvatarFallback className="bg-primary/10 font-display text-[10px] font-black text-primary">
                {fallbackInitial}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.28em] text-primary">
                Signed in
              </p>
              <p className="mt-1 truncate text-[10px] normal-case tracking-normal text-foreground/70">
                {user.data?.user?.email || displayName}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuGroup>
          {navItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="cursor-pointer rounded border border-transparent px-2.5 py-2 text-[11px] focus:border-primary/30 focus:bg-primary/10 focus:text-primary"
              >
                {item.label === "My Games" ? (
                  <Gamepad2 className="size-4 text-primary" />
                ) : (
                  <UserRound className="size-4 text-primary" />
                )}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-primary/20" />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded border border-transparent px-2.5 py-2 text-[11px] focus:border-primary/30 focus:bg-primary/10 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/10">
              <Palette className="size-4 text-primary" />
              Change theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="rounded border-primary/35 bg-background/95 p-1.5 font-mono text-xs uppercase tracking-wider shadow-[0_0_24px_color-mix(in_oklch,var(--glow)_18%,transparent)] backdrop-blur-xl">
                {themes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.name}
                    onClick={() => {
                      setActiveTheme(theme.name);
                      handleThemeChange(theme.name);
                    }}
                    className={
                      activeTheme === theme.name
                        ? "rounded border border-primary/35 bg-primary/15 text-primary"
                        : "rounded border border-transparent focus:border-primary/30 focus:bg-primary/10 focus:text-primary"
                    }
                  >
                    <span
                      className="size-2.5 rounded-full border border-primary/30"
                      style={{ backgroundColor: theme.color }}
                    />
                    {theme.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1 bg-primary/20" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="rounded border border-transparent px-2.5 py-2 text-[11px] focus:border-destructive/30 focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="size-4 text-destructive" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
