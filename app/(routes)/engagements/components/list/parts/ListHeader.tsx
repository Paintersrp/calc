import type { FC, ReactNode } from "react"

import { Text } from "@/components/ui/Text"

import { EngagementAddDialog } from "../../EngagementAddDialog"

interface EngagementListHeaderProps {
  children: ReactNode
}

const ListHeader: FC<EngagementListHeaderProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Text type="h4">{children}</Text>
      <EngagementAddDialog />
    </div>
  )
}

export { ListHeader }
