import Link from "next/link";

import { BrandLogo } from "./brand-logo";
import { ModeSwitcher } from "./mode-switcher";
import { NavItem } from "./nav-item";
import { UserDropdown } from "./user-dropdown";

export const navItems = [
  {
    label: "My Games",
    href: "/play/my-games",
  },
  {
    label: "Profile",
    href: "/play/profile",
  },
];

export default async function Header() {
  return (
    <header className="sticky top-0 z-40 mb-5 border-b border-primary/25 bg-background/85 px-4 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
        >
          <BrandLogo size="md" textClassName="hidden sm:inline" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ModeSwitcher />

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
