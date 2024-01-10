import type { FC } from "react"
import { getShifts } from "@/actions/shifts"

import { Separator } from "@/components/ui/Separator"

import { ShiftTable } from "./components/ShiftTable"

const Page: FC = async () => {
  const shifts = await getShifts()

  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Shifts</h3>
          <p className="text-sm text-muted-foreground">View and manage shift entries</p>
        </div>
        <Separator />

        <ShiftTable data={shifts} />
      </section>
    </>
  )
}

export default Page
