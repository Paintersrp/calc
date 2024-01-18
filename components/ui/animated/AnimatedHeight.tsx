import { useEffect, useRef, useState, type FC } from "react"
import { motion, type Transition } from "framer-motion"

import { cn } from "@/lib/utils"

interface AnimateHeightProps {
  children: React.ReactNode
  layout?: boolean
  transition?: Transition
  className?: string
}

export const AnimateHeight: FC<AnimateHeightProps> = ({
  children,
  layout,
  transition,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number | "auto">("auto")

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height
        setHeight(observedHeight)
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <motion.div
      layout={layout}
      className={cn(className, "overflow-hidden")}
      style={{ height }}
      initial={false}
      animate={{ height }}
      transition={transition}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  )
}

AnimateHeight.defaultProps = {
  transition: {
    duration: 0.3,
    type: "ease",
    ease: "easeInOut",
  },
  layout: false,
}
