"use client"

import { useState, type FC } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/ui/Icons"

import { AnimatedNav } from "../ui/animated/AnimatedNav"
import { useAnimatedNav } from "../ui/animated/hooks/useAnimatedNav"

const Navbar: FC = () => {
  const navItems = [
    {
      id: "staffing",
      title: "Staffing",
      href: "/",
    },
    {
      id: "roster",
      title: "Roster",
      href: "/roster",
    },
    {
      id: "settings",
      title: "Settings",
      href: "/settings",
    },
    // {
    //   id: "rate",
    //   title: "Rate",
    //   href: "/rate",
    // },
    // {
    //   id: "engagements",
    //   title: "Engagements",
    //   href: "/engagements",
    // },
  ]

  const [navProps] = useState({
    navItems,
    initialItemId: undefined,
  })

  const { itemProps } = useAnimatedNav(navProps)

  return (
    <div className="flex">
      <div className="flex items-center space-x-2">
        <Icons.PackageOpen className="h-7 sm:h-7 w-7 sm:w-7" />
      </div>

      <AnimatedNav {...itemProps} />
    </div>
  )
}

export { Navbar }
