import type { FC } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  iconClass?: string
}

const Loading: FC<LoadingProps> = ({ className, iconClass }) => {
  return (
    <div className={cn("flex w-full justify-center items-center", className)}>
      <Loader2 className={cn("mr-2 h-16 w-16 animate-spin", iconClass)} />
    </div>
  )
}

export { Loading }
