"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

import { useMounted } from "@/hooks/useMounted"

import { QuickAccessToggle } from "./QuickAccessToggle"
import { ThemeToggle } from "./ThemeToggle"

const animationVariants = {
  initial: { opacity: 0, y: -15 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
}

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.25,
}

const HeaderActions: FC = ({}) => {
  const mounted = useMounted()

  if (!mounted) return null

  return (
    <motion.div
      className="ml-auto flex items-center gap-x-2"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={animationVariants}
      transition={transition}
    >
      <QuickAccessToggle />
      <ThemeToggle />
    </motion.div>
  )
}

export { HeaderActions }
