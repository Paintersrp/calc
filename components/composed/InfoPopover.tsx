import type { FC, ReactNode } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"

import { Icons } from "../ui/Icons"

interface InfoPopoverProps {
  children: ReactNode
}

const InfoPopover: FC<InfoPopoverProps> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Icons.Info className="h-6 w-6 dark:text-blue-300 text-blue-500 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p className="text-sm">{children}</p>
      </PopoverContent>
    </Popover>
  )
}

export { InfoPopover }
