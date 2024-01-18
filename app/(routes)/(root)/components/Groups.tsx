"use client"

import { FC } from "react"

import { Loading } from "@/components/layout/Loading"

import { Group } from "./Group"
import { GroupAddSkeleton } from "./GroupAddSkeleton"
import { useShiftPlanData } from "./ShiftPlanDataProvider"

interface GroupsProps {
  index: number
}

const Groups: FC<GroupsProps> = ({ index }) => {
  const { data, loading } = useShiftPlanData()

  // Remove loading if we want each individual group to internally stream as a skeleton component while it loads
  if (!data || !data.plans || loading) return <Loading />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.plans[index].groups.map((group) => (
        <Group group={group} />
      ))}

      {/* Add Group Skeleton */}
      <GroupAddSkeleton />
    </div>
  )
}

export { Groups }
