"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

import { useCountAnimation } from "@/hooks/useCountAnimation"
import { Card, CardContent, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"

interface TotalProps {
  title: string
  stationCount: number
  headcount: number
}

const Total: FC<TotalProps> = ({ title, stationCount, headcount }) => {
  const { displayNumber: finalStationCount } = useCountAnimation(stationCount)
  const { displayNumber: finalHeadcount } = useCountAnimation(headcount)
  const percentage = (finalHeadcount / finalStationCount) * 100

  return (
    <Card>
      <CardContent className="py-4 px-4 flex flex-col space-y-2">
        <CardTitle className="text-center text-xl">{title}</CardTitle>
        <div className="space-y-1 px-1">
          <div className="flex justify-between text-muted-foreground">
            <span>Total Stations</span>
            <motion.span className="font-semibold">{finalStationCount}</motion.span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Total Headcount</span>
            <motion.span className="font-semibold">{finalHeadcount}</motion.span>
          </div>
        </div>
        <Progress value={percentage} className="transition-all" />
      </CardContent>
    </Card>
  )
}

export { Total }
