import type { FC, ReactNode } from "react"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/HoverCard"

import { Icons } from "./Icons"

interface InfoHoverProps {
  children: ReactNode
}

const InfoHover: FC<InfoHoverProps> = ({ children }) => {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Icons.info className="h-6 w-6 dark:text-blue-300 text-blue-500" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="text-sm">{children}</p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default InfoHover
