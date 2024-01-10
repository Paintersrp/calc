import type { FC } from "react"

import { Skeleton } from "@/components/ui/Skeleton"

const EngagementDetailSkeleton: FC = () => {
  return (
    <div>
      <div className="flex items-center">
        {/* Header Skeleton */}
        <div className="flex w-full flex-col">
          <Skeleton className="h-6 w-2/4 mb-1 rounded-md" />
          <Skeleton className="h-4 w-2/5 rounded-md" />
        </div>
        {/* Buttons Skeleton */}
        <div className="flex justify-end space-x-2 m-4 mt-0">
          <Skeleton className="h-11 w-32 rounded-md" />
          <Skeleton className="h-11 w-32 rounded-md" />
          <Skeleton className="h-11 w-32 rounded-md" />
        </div>
      </div>

      {/* Separator Skeleton */}
      <Skeleton className="h-[2px] w-full mb-4 mt-2 rounded-md" />

      {/* Form Fields Skeleton */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Skeleton className="h-6 w-[15%] mb-2 rounded-md" />
          <Skeleton className="h-8 w-full mb-2 rounded-md" />
        </div>
        <div>
          <Skeleton className="h-6 w-[15%] mb-2 rounded-md" />
          <Skeleton className="h-8 w-full mb-2 rounded-md" />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-6 w-[7.5%] mb-2 rounded-md" />
          <Skeleton className="h-40 w-full rounded-md" />
        </div>
      </div>
      <div className="flex justify-end w-full mt-6 pr-1">
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    </div>
  )
}

export { EngagementDetailSkeleton }
