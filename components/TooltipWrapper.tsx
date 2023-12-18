import { FC, ReactNode } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

interface TooltipWrapperProps {
  children: ReactNode
  content: string
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({ children, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p className="dark:text-white text-dark">{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export { TooltipWrapper }
