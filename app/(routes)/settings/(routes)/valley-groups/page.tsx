import type { FC } from "react"
import { getShifts } from "@/actions/shifts"
import { getValleyGroups } from "@/actions/valley-groups"

import { Separator } from "@/components/ui/Separator"

import { ValleyGroupColumns } from "./components/ValleyGroupColumns"
import { ValleyGroupTable } from "./components/ValleyGroupTable"

const Page: FC = async () => {
  const valleyGroups = await getValleyGroups()

  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Valley Groups</h3>
          <p className="text-sm text-muted-foreground">View and manage valley group entries</p>
        </div>
        <Separator />

        <ValleyGroupTable data={valleyGroups} columns={ValleyGroupColumns} />
      </section>
    </>
  )
}

export default Page
