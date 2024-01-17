"use client"

import type { FC } from "react"

import { DevCode } from "@/components/ui/DevCode"
import { Separator } from "@/components/ui/Separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Heading } from "@/components/composed/Heading"
import { Loading } from "@/components/layout/Loading"
import { useValleyCountsByQuarterContext } from "@/components/layout/ValleyCountByQuarterProvider"

import { QuarterSection } from "./QuarterSection"

interface HeadcountsProps {
  //
}

const Headcounts: FC<HeadcountsProps> = ({}) => {
  const valleyCounts = useValleyCountsByQuarterContext()

  console.log(valleyCounts)

  const isEmpty = valleyCounts && Object.keys(valleyCounts).length === 0

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Headcounts" />
      </div>
      <Separator />
      {!isEmpty ? (
        <Tabs defaultValue="1" className="">
          <TabsList>
            <TabsTrigger value="1" className="min-w-[50px]">
              Q1
            </TabsTrigger>
            <TabsTrigger value="2" className="min-w-[50px]">
              Q2
            </TabsTrigger>
            <TabsTrigger value="3" className="min-w-[50px]">
              Q3
            </TabsTrigger>
            <TabsTrigger value="4" className="min-w-[50px]">
              Q4
            </TabsTrigger>
          </TabsList>
          <TabsContent value="1" className="mt-4">
            <QuarterSection headcounts={valleyCounts[1]} quarter="Q1" />
          </TabsContent>
          <TabsContent value="2" className="mt-4">
            <QuarterSection headcounts={valleyCounts[2]} quarter="Q2" />
          </TabsContent>
          <TabsContent value="3" className="mt-4">
            <QuarterSection headcounts={valleyCounts[3]} quarter="Q3" />
          </TabsContent>
          <TabsContent value="4" className="mt-4">
            {valleyCounts[4]["Mezz"].map((count) => (
              <DevCode data={count} />
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <Loading />
      )}
    </section>
  )
}

export { Headcounts }
