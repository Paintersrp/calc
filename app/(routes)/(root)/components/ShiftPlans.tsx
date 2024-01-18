"use client"

import type { FC } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

import { Groups } from "./Groups"

const ShiftPlans: FC = () => {
  const quarters = [
    { value: "Q1", title: "Days (1st)" },
    { value: "Q2", title: "Days (2nd)" },
    { value: "Q3", title: "Nights (1st)" },
    { value: "Q4", title: "Nights (2nd)" },
  ]

  return (
    <Tabs defaultValue={quarters[0].value}>
      <TabsList className="mb-2">
        {quarters.map((quarter) => (
          <TabsTrigger key={quarter.title} className="w-28" value={quarter.value}>
            {quarter.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {quarters.map((quarter, index) => (
        <TabsContent key={quarter.value} value={quarter.value}>
          <Groups index={index} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { ShiftPlans }
