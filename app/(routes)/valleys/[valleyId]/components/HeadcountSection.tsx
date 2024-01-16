"use client"

import { useEffect, useState, type FC } from "react"

import { Icons } from "@/components/ui/Icons"
import { Heading } from "@/components/composed/Heading"
import { Loading } from "@/components/layout/Loading"
import { useValleyCountsByIdContext } from "@/app/(routes)/valleys/[valleyId]/components/ValleyCountByIdProvider"

import { HeadcountCard } from "./HeadcountCard"
import { SectionContainer } from "./SectionContainer"

interface HeadcountSectionProps {
  valleyId: string
}

const HeadcountSection: FC<HeadcountSectionProps> = ({ valleyId }) => {
  const valleyCounts = useValleyCountsByIdContext()
  const [counts, setCounts] = useState(valleyCounts[valleyId])

  useEffect(() => {
    setCounts(valleyCounts[valleyId])
  }, [valleyId, valleyCounts])

  return (
    <SectionContainer>
      <div className="flex items-center space-x-4">
        <Icons.Tally className="w-9 h-9 ml-4" />
        <Heading
          title="Headcounts"
          description="Maintain and update valley headcount by quarter"
          titleClass="text-xl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
        {counts ? (
          counts.map((count) => <HeadcountCard key={count.id} count={count} />)
        ) : (
          <>
            {/* Replace with Skeleton */}
            <Loading className="border p-4" iconClass="w-12 h-12" />
            <Loading className="border p-4" iconClass="w-12 h-12" />
            <Loading className="border p-4" iconClass="w-12 h-12" />
            <Loading className="border p-4" iconClass="w-12 h-12" />
          </>
        )}
      </div>
    </SectionContainer>
  )
}

export { HeadcountSection }
