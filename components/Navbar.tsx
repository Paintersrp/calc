import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"

import { buttonVariants } from "./ui/Button"

interface NavbarProps {
  items?: NavItem[]
}

export function Navbar({ items }: NavbarProps) {
  return (
    <div className="flex gap-2 md:gap-4">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.openbox className="h-7 sm:h-7 w-7 sm:w-7" />
        <span className="hidden sm:inline-block dark:font-bold font-medium text-base sm:text-lg">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length && (
        <nav className="flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({ size: "sm", variant: "link" })}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      )}
    </div>
  )
}

// className={cn(
//   "flex items-center text-sm font-medium",
//   item.disabled && "cursor-not-allowed opacity-80"
// )}
