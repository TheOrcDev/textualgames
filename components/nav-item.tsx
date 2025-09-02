"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "./ui/8bit/button";

interface NavItemProps {
  href: string;
  label: string;
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      className={cn("text-xs", isActive && "bg-primary/30")}
      variant={"link"}
      key={href}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
