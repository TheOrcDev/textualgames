"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface NavItemProps {
  href: string;
  label: string;
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      className={cn(
        "font-mono text-xs uppercase tracking-widest",
        isActive && "border-primary/40 bg-primary/10 text-primary",
      )}
      variant={isActive ? "outline" : "ghost"}
      key={href}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
