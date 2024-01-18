"use client"

import { ReactNode, type FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { Tables } from "@/types/supabase"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/Icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu"

type ValleyWithGroup = (Tables<"valleys"> & { valley_group: Tables<"valley_groups"> })[]

type GroupedValleys = {
  [key: string]: ValleyWithGroup
}

export function HeaderNavigation({ valleys }: { valleys: ValleyWithGroup }) {
  const pathname = usePathname()

  const mainItems = [
    {
      href: "/",
      title: "Staffing",
    },
    {
      href: "/headcount",
      title: "Headcount",
    },
    {
      href: "/roster",
      title: "Roster",
    },
    {
      href: "/stations",
      title: "Stations",
    },
  ]

  const settingsItems = [
    {
      href: "/settings/departments",
      title: "Manage Departments",
    },
    {
      href: "/settings/shifts",
      title: "Manage Shifts",
    },
    {
      href: "/settings/processes",
      title: "Manage Processes",
    },
    {
      href: "/settings/roles",
      title: "Manage Roles",
    },
    {
      href: "/settings/valleys",
      title: "Manage Valleys",
    },
    {
      href: "/settings/valley-groups",
      title: "Manage Valley Groups",
    },
  ]

  const groupedValleys = valleys.reduce<GroupedValleys>((acc, valley) => {
    acc[valley.valley_group.name] = acc[valley.valley_group.name] || []
    acc[valley.valley_group.name].push(valley)
    return acc
  }, {})

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* General Routes */}
        {mainItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <ListItem pathname={pathname} href={item.href}>
              {item.title}
            </ListItem>
          </NavigationMenuItem>
        ))}

        {/* Valleys */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-2">Valleys</NavigationMenuTrigger>
          <NavigationMenuContent>
            {Object.entries(groupedValleys).map(([groupId, valleysInGroup]) => (
              <div key={groupId} className="p-4">
                {/* Optional: Add a header or title for each group here */}
                <div className="text-lg font-bold tracking-tight w-full text-primary">
                  {groupId}
                </div>
                <ul className="grid gap-3 p-2 w-[300px] md:w-[400px] lg:w-[500px] grid-cols-2 md:grid-cols-3">
                  {valleysInGroup.map((valley) => (
                    <ListItem key={valley.id} pathname={pathname} href={`/valleys/${valley.id}`}>
                      {valley.name}
                    </ListItem>
                  ))}
                </ul>
              </div>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Settings */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-2">Settings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-2 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-3">
              <li className="row-span-5">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex w-full h-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/75 hover:bg-muted/75 to-muted p-4 no-underline outline-none focus:shadow-md"
                    href="/settings"
                  >
                    <Icons.Settings className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Settings</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Manage tables for available valleys, stations, shifts, and more as well as
                      general application settings.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <div className="col-span-2 grid grid-cols-2 gap-2 w-full">
                {settingsItems.map((item) => (
                  <ListItem key={item.href} pathname={pathname} href={item.href}>
                    {item.title}
                  </ListItem>
                ))}
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  pathname: string
  href: string
  children: ReactNode
  className?: string
}

const ListItem: FC<ListItemProps> = ({ pathname, href, children, className }) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          "select-none space-y-1 h-10 rounded-md p-2 no-underline outline-none transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground flex items-center",
          pathname === href && "bg-muted/60 text-muted-foreground",
          className
        )}
      >
        <div className="text-sm font-medium leading-none flex items-center">{children}</div>
      </NavigationMenuLink>
    </Link>
  )
}

export { ListItem }
