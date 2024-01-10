import type { FC } from "react"
import { getRoles } from "@/actions/roles"

import { Separator } from "@/components/ui/Separator"

import { RoleTable } from "./components/RoleTable"

const Page: FC = async () => {
  const roles = await getRoles()

  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Roles</h3>
          <p className="text-sm text-muted-foreground">View and manage role entries</p>
        </div>
        <Separator />

        <RoleTable data={roles} />
      </section>
    </>
  )
}

export default Page
