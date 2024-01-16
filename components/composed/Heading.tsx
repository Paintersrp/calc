import type { FC } from "react"

import { cn } from "@/lib/utils"

interface HeadingProps {
  title: string
  description?: string
  className?: string
  titleClass?: string
  descClass?: string
}

const Heading: FC<HeadingProps> = ({ title, description, className, titleClass, descClass }) => {
  return (
    <div className={className}>
      <h2 className={cn("text-3xl font-bold tracking-tight", titleClass)}>{title}</h2>
      {description && (
        <p className={cn("text-sm text-muted-foreground", descClass)}>{description}</p>
      )}
    </div>
  )
}

export { Heading }
