import type { FC } from "react"

import { Skeleton } from "@/components/ui/Skeleton"

const CalcResultsSkeleton: FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold ">Calculation Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="p-4 rounded-lg h-20 dark:bg-slate-800 bg-slate-400" />
        <Skeleton className="p-4 rounded-lg h-20 dark:bg-slate-800 bg-slate-400" />
      </div>

      <div className="mt-6">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton
                className={`dark:bg-slate-800 bg-slate-400 p-4 ${
                  index === 0 ? "rounded-t-lg" : "rounded-lg"
                } h-12`}
              />
              {index === 0 && (
                <Skeleton className="p-4 dark:bg-slate-800 bg-slate-400 rounded-b-lg h-24" />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default CalcResultsSkeleton
