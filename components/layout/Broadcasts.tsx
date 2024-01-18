"use client"

import { Fragment, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { useCountAnimation } from "@/hooks/useCountAnimation"
import { Button } from "@/components/ui/Button"
import { CommandDialog, CommandItem, CommandList, CommandSeparator } from "@/components/ui/Command"
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"

import { AnimateHeight } from "../ui/animated/AnimatedHeight"
import { BroadcastCard } from "./BroadcardCard"
import { useBroadcasts } from "./BroadcastsProvider"

const transition = {
  type: "tween",
  ease: "linear",
  duration: 0.3,
}

const Broadcasts = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { broadcasts, broadcastCount } = useBroadcasts()
  const { displayNumber } = useCountAnimation(broadcastCount)

  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (broadcasts.length < 1) {
      setOpen(false)
    }
  }, [broadcasts])

  return (
    <>
      <TooltipWrapper content="View station broadcasts">
        <div className="relative inline-block">
          <Button variant="ghost" size="icon" onClick={handleOpen}>
            <Icons.Monitor className="h-6 sm:h-6 w-6 sm:w-6" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {displayNumber !== 0 && (
            <div className="absolute top-2 -left-2 transform translate-x-1/2 -translate-y-1/2 bg-success text-white font-bold text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {displayNumber}
            </div>
          )}
        </div>
      </TooltipWrapper>

      <CommandDialog open={open} onOpenChange={handleOpen}>
        <DialogHeader className="p-6 space-y-0">
          <DialogTitle className="text-primary">Broadcasted Stations</DialogTitle>
        </DialogHeader>
        <CommandSeparator />
        {broadcasts.length > 0 && (
          <CommandList
            className="space-y-0 max-h-[550px] [&_[cmdk-item]]:px-0 
          [&_[cmdk-item]]:py-0"
          >
            <AnimatePresence mode="popLayout">
              <AnimateHeight layout transition={transition}>
                {broadcasts.map((broadcast, index) => (
                  <Fragment key={broadcast.id}>
                    <CommandItem className="px-0 py-0" key={broadcast.id}>
                      <BroadcastCard broadcast={broadcast} />
                    </CommandItem>
                    {index < broadcasts.length - 1 && <CommandSeparator />}
                  </Fragment>
                ))}
              </AnimateHeight>
            </AnimatePresence>
          </CommandList>
        )}
      </CommandDialog>
    </>
  )
}

export { Broadcasts }
