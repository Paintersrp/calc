import type { FC, ReactNode } from "react"

import { TooltipWrapper } from "@/components/ui/Tooltip"

import { EngagementAddDialog } from "../EngagementAddDialog"

interface EngagementListHeaderProps {
  children: ReactNode
}

const EngagementListHeader: FC<EngagementListHeaderProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-medium leading-none tracking-tight">{children}</h1>
      <TooltipWrapper content="Add new engagement">
        <EngagementAddDialog />
      </TooltipWrapper>
    </div>
  )
}

export { EngagementListHeader }
