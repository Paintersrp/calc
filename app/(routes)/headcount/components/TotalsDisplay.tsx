"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

import { useCountAnimation } from "@/hooks/useCountAnimation"
import { Card, CardContent, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"

interface TotalsDisplayProps {
  headcounts: { [key: string]: ValleyCountByQuarter[] }
}

const TotalsDisplay: FC<TotalsDisplayProps> = ({ headcounts }) => {
  let mezzStationCount = 0
  let mezzHeadcount = 0

  let dockStationCount = 0
  let dockHeadcount = 0

  Object.entries(headcounts).forEach(([groupName, valleys]) => {
    valleys.forEach((valley) => {
      const stationCount = valley.valley.stations.length
      const headcount = valley.count

      if (groupName === "Mezz") {
        mezzStationCount += stationCount
        mezzHeadcount += headcount
      } else if (groupName === "West Dock") {
        dockStationCount += stationCount
        dockHeadcount += headcount
      }
    })
  })

  const { displayNumber: finalMezzHeadcount } = useCountAnimation(mezzHeadcount ?? 0)
  const { displayNumber: finalMezzStationCount } = useCountAnimation(mezzStationCount ?? 0)

  const { displayNumber: finalDockHeadcount } = useCountAnimation(dockHeadcount ?? 0)
  const { displayNumber: finalDockStationCount } = useCountAnimation(dockStationCount ?? 0)

  const { displayNumber: fullHeadcount } = useCountAnimation(mezzHeadcount + dockHeadcount ?? 0)
  const { displayNumber: fullStations } = useCountAnimation(
    mezzStationCount + dockStationCount ?? 0
  )

  const dockPercentage = (finalDockHeadcount / finalDockStationCount) * 100
  const mezzPercentage = (finalMezzHeadcount / finalMezzStationCount) * 100
  const fullPercentage = (fullHeadcount / fullStations) * 100

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="py-4 px-4 flex flex-col space-y-2">
          <CardTitle className="text-center text-xl">All (Process)</CardTitle>

          <div className="px-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Total Stations</span>
              <motion.span className="font-semibold">{fullStations}</motion.span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Headcount</span>
              <motion.span className="font-semibold">{fullHeadcount}</motion.span>
            </div>
          </div>
          <Progress value={fullPercentage} className="transition-all" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4 px-4 flex flex-col space-y-2">
          <CardTitle className="text-center text-xl">West Dock</CardTitle>

          <div className="space-y-1 px-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Total Stations</span>
              <motion.span className="font-semibold">{finalDockStationCount}</motion.span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Headcount</span>
              <motion.span className="font-semibold">{finalDockHeadcount}</motion.span>
            </div>
          </div>

          <Progress value={dockPercentage} className="transition-all !duration-1000" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4 px-4 flex flex-col space-y-2">
          <CardTitle className="text-center text-xl">Mezz</CardTitle>

          <div className="space-y-1 px-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Total Stations</span>
              <motion.span className="font-semibold">{finalMezzStationCount}</motion.span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Headcount</span>
              <motion.span className="font-semibold">{finalMezzHeadcount}</motion.span>
            </div>
            {/* <div className="flex justify-between text-muted-foreground text-sm">
              <span>Percent Full</span>
              <span>{((mezzHeadcount / mezzStationCount) * 100).toFixed(2)}%</span>
            </div> */}
          </div>
          <Progress value={mezzPercentage} className="transition-all" />
        </CardContent>
      </Card>
    </div>
  )
}

export { TotalsDisplay }
