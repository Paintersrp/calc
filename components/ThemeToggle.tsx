"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import { TooltipWrapper } from "@/components/TooltipWrapper"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <TooltipWrapper content={theme === "light" ? "Swap to Dark" : "Swap to Light"}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-6 sm:h-6 w-6 sm:w-6 dark:hidden" />
        <Moon className="hidden h-6 sm:h-6 w-6 sm:w-6 dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </TooltipWrapper>
  )
}
