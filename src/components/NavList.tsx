"use client";

import { cn } from "@/utils/cn";
import { navLinks } from "@/utils/navLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavList = () => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "px-[3rem] hidden md:block border-border bg-secondaryBackgroundColor border-solid rounded-[3rem] w-[100%] border-[2px]",
      )}
    >
      <ul
        className={cn(
          "flex justify-between h-[4rem] items-center gap-[2rem] text-white",
        )}
      >
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                className={cn("leading-[1.5rem] text-[1.25rem]", {
                  "text-primary font-bold": isActive,
                })}
                href={link.href}
              >
                {link.name.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavList;
