"use client"

import { useEffect } from "react"

import useConfigStore from "@/lib/state/config"
import CalcConfiguration from "@/components/calc/CalcConfiguration"
import CalcResults from "@/components/calc/CalcResults"

export default function Page() {
  const { shift, updateRemainingHoursAuto } = useConfigStore()

  useEffect(() => {
    const intervalId = setInterval(updateRemainingHoursAuto, 60000)

    return () => clearInterval(intervalId)
  }, [shift, updateRemainingHoursAuto])

  return (
    <section className="sm:container gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 shadow rounded">
        <div className="col-span-1 w-full border space-y-4 p-4 border-r-0 dark:border-slate-700 border-slate-300 sm:rounded-l-md">
          <CalcConfiguration />
        </div>
        <div className="col-span-2 sm:space-y-4 border p-4 dark:border-slate-700 border-slate-300 sm:rounded-r-md">
          <CalcResults />
        </div>
      </div>
    </section>
  )
}
