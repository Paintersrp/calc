import type { FC } from "react"
import { getProcesses } from "@/actions/processes"

import { Separator } from "@/components/ui/Separator"

import { ProcessColumns } from "./components/ProcessColumns"
import { ProcessTable } from "./components/ProcessTable"

const Page: FC = async () => {
  const processes = await getProcesses()

  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Processes</h3>
          <p className="text-sm text-muted-foreground">View and manage process entries</p>
        </div>

        <Separator />

        <ProcessTable data={processes} columns={ProcessColumns} />
      </section>
    </>
  )
}

export default Page
