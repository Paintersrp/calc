import type { FC } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"

const ShiftPlanSkeleton: FC = () => {
  return (
    <>
      <Skeleton className="h-8 w-1/3 mb-4 mt-4 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="mb-4 space-y-2">
            <CardHeader className="p-4 pb-2 justify-center">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-2/5" />

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-4 pt-0">
              <Skeleton className="h-4 w-full mb-2 p-4" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-between items-center gap-2">
                    <Skeleton className="h-4 w-[7.5%] p-4 rounded-md" />
                    <Skeleton className="h-4 w-[45%] p-4 rounded-md" />
                    <Skeleton className="h-4 w-[45%] p-4 rounded-md" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export { ShiftPlanSkeleton }
