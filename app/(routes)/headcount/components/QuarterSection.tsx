import type { FC } from "react"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/composed/Heading"

import { HeadcountTable } from "./HeadcountTable"
import { TotalsDisplay } from "./TotalsDisplay"

interface QuarterSectionProps {
  headcounts: { [key: string]: ValleyCountByQuarter[] }
  quarter: string
}

const QuarterSection: FC<QuarterSectionProps> = ({ headcounts, quarter }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      <div className="col-span-2 space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <Heading title={`${quarter} West Dock Headcount`} titleClass="text-xl" />
          <Separator />
          <HeadcountTable counts={headcounts["West Dock"]} />
        </div>
        <div className="border rounded-lg p-4 space-y-4">
          <Heading title={`${quarter} Mezz Headcount`} titleClass="text-xl" />
          <Separator />
          <HeadcountTable counts={headcounts["Mezz"]} />
        </div>
      </div>
      <div className="space-y-4 border rounded-lg p-4">
        <Heading title="Totals" titleClass="text-xl" />
        <Separator />
        <TotalsDisplay headcounts={headcounts}/>
      </div>
    </section>
  )
}

export { QuarterSection }
