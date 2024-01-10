"use client"

import { useCallback, useEffect, type FC } from "react"

import { useQuickAccess } from "@/lib/state/quick-access"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { Text } from "@/components/ui/Text"
import { TooltipWrapper } from "@/components/ui/Tooltip"

const QuickAccessToggle: FC = () => {
  const { open, setOpen } = useQuickAccess()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "q") {
        event.preventDefault()
        setOpen(!open)
      }
    },
    [open, setOpen]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <TooltipWrapper
      content={
        <div className="space-y-1">
          <Text className="font-medium">Open quick access</Text>
          <Text variant="muted" size="sm">
            <kbd className="rounded-md border bg-accent px-1 py-0.5 text-sm font-bold">CTRL-Q</kbd>
            {"  "} to open with shortcut
          </Text>
        </div>
      }
    >
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Icons.TerminalSquare className="h-6 sm:h-6 w-6 sm:w-6" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </TooltipWrapper>
  )
}

export { QuickAccessToggle }
