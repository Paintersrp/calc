"use client"

import { FC } from "react"

import { Total } from "./Total"

interface TotalsDisplayProps {
  headcounts: { [key: string]: ValleyCountByQuarter[] }
}

const Totals: FC<TotalsDisplayProps> = ({ headcounts }) => {
  const calculateCounts = (valleys: ValleyCountByQuarter[]) => {
    return valleys.reduce(
      (acc, valley) => ({
        stationCount: acc.stationCount + valley.valley.stations.length,
        headcount: acc.headcount + valley.count,
      }),
      { stationCount: 0, headcount: 0 }
    )
  }

  const groups = Object.entries(headcounts).map(([title, valleys]) => ({
    title,
    ...calculateCounts(valleys),
  }))

  const combined = groups.reduce(
    (acc, group) => ({
      ...acc,
      stationCount: acc.stationCount + group.stationCount,
      headcount: acc.headcount + group.headcount,
    }),
    { title: "All (Process)", stationCount: 0, headcount: 0 }
  )

  const mergedGroups = [combined, ...groups]

  return (
    <div className="space-y-4">
      {mergedGroups.map((group) => (
        <Total
          key={group.title}
          title={group.title}
          stationCount={group.stationCount}
          headcount={group.headcount}
        />
      ))}
    </div>
  )
}

export { Totals }
