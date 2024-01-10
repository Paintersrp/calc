import type { FC } from "react"
import { getDepartments } from "@/actions/departments"

import { Separator } from "@/components/ui/Separator"

import { DepartmentTable } from "./components/DepartmentTable"

const Page: FC = async () => {
  const departments = await getDepartments()

  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Departments</h3>
          <p className="text-sm text-muted-foreground">View and manage department entries</p>
        </div>
        <Separator />
        <DepartmentTable data={departments} />
      </section>
    </>
  )
}

export default Page
