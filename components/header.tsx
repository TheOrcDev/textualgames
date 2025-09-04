import Image from "next/image";
import Link from "next/link";

import { isSubscriptionValid } from "@/server/subscriptions";

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

export default function Header() {
  const subscription = isSubscriptionValid();

  return (
    <header className="px-10 border-b mb-5 bg-primary/20">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/">
          <Image
            src="/textual-games-logo.png"
            alt="Textual Games Logo"
            width={50}
            height={50}
          />
        </Link>

        <div className="items-center hidden md:flex">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ModeSwitcher />

          <UserDropdown subscription={subscription} />
        </div>
      </div>
    </header>
  );
}
