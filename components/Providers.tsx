"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { TooltipProvider } from "@/components/ui/Tooltip"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <TooltipProvider delayDuration={0} skipDelayDuration={500}>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
