"use client"

import { useState } from "react"

import { Separator } from "@/components/ui/Separator"
import { DatePicker } from "@/components/composed/DatePicker"
import { Heading } from "@/components/composed/Heading"

import { ShiftPlanDataProvider } from "./components/ShiftPlanDataProvider"
import { ShiftPlans } from "./components/ShiftPlans"

export default function Page() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Shift Planner" description="View and manage daily staffing plans" />

        <DatePicker date={date} setDate={setDate} />
      </div>

      <Separator />

      <ShiftPlanDataProvider date={date}>
        <ShiftPlans />
      </ShiftPlanDataProvider>
    </section>
  )
}
