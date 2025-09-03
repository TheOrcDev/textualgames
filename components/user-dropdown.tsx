"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { saveConfiguration } from "@/server/configurations";

import { authClient } from "@/lib/auth-client";
import { Theme } from "@/lib/themes";
import { themes } from "@/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";
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
} from "@/components/ui/8bit/dropdown-menu";

import { useThemeConfig } from "./active-theme";
import { navItems } from "./header";

export function UserDropdown() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const user = authClient.useSession();
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
        <Avatar>
          <AvatarImage
            src={user.data?.user?.image || ""}
            alt={user.data?.user?.name || "User"}
          />
          <AvatarFallback>
            {user.data?.user?.name?.[0] || "User"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-xs w-56 rounded-none">
        <DropdownMenuGroup>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <DropdownMenuItem>{item.label}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {themes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.name}
                    onClick={() => {
                      setActiveTheme(theme.name);
                      handleThemeChange(theme.name);
                    }}
                    className={
                      activeTheme === theme.name ? "bg-primary/30" : ""
                    }
                  >
                    {theme.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
