import type { FC } from "react"
import { getProcesses } from "@/actions/processes"
import { getRoles } from "@/actions/roles"

import { Separator } from "@/components/ui/Separator"

import { RoleColumns } from "./components/RoleColumns"
import { RoleTable } from "./components/RoleTable"

const Page: FC = async () => {
  const roles = await getRoles()
  const processes = await getProcesses()

  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Roles</h3>
          <p className="text-sm text-muted-foreground">View and manage role entries</p>
        </div>
        <Separator />

        <RoleTable data={roles} columns={RoleColumns} processes={processes}/>
      </section>
    </>
  )
}

export default Page
