"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"
import { TooltipWrapper } from "@/components/TooltipWrapper"

export function Footer() {
  return (
    <footer className="bg-background sticky bottom-0 z-40 w-full border-t">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex space-x-2 items-center">
          <Icons.copyright className="h-6 w-6" />
          <div className="flex flex-col">
            <p className="dark:text-white text-black font-bold text-sm">
              2023 - Rate Calculator
            </p>
            <p className="dark:text-white text-black font-bold text-sm">
              Ryan Painter
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* Github Button and Link */}
            <TooltipWrapper content="View code on Github">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </TooltipWrapper>

            {/* Portfolio Icon and Link */}
            <TooltipWrapper content="Contact Me">
              <Link
                href={siteConfig.links.email}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.contact className="h-5 w-5" />
                  <span className="sr-only">Email Address contact</span>
                </div>
              </Link>
            </TooltipWrapper>
          </nav>
        </div>
      </div>
    </footer>
  )
}
