import type { FC, ReactNode } from "react"

import { ScrollArea } from "@/components/ui/ScrollArea"

interface ListBodyProps {
  children: ReactNode
}

const ListBody: FC<ListBodyProps> = ({ children }) => {
  return (
    <ScrollArea className="max-h-[600px] w-full">
      <div className="space-y-1.5">{children}</div>
    </ScrollArea>
  )
}

export { ListBody }
