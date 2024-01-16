import { getAssociates } from "@/actions/associates"
import { getDepartments } from "@/actions/departments"
import { getRoles } from "@/actions/roles"
import { getShifts } from "@/actions/shifts"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/composed/Heading"

import { RosterAddModal } from "./components/RosterAddModal"
import { RosterColumns } from "./components/RosterColumns"
import { RosterTable } from "./components/RosterTable"

const RosterPage = async () => {
  const roster = await getAssociates(
    `*, 
    associates_roles (*, roles (*)),
    departments (*),
    shifts (*)`
  )

  const formattedRoster = roster.map((associate) => {
    return {
      id: associate.id,
      login: associate.login,
      department: associate.departments.name,
      shift: associate.shifts.name,
      roles: associate.associates_roles?.map((role: any) => role.roles.name) ?? [],
      updated_at: associate.updated_at,
    }
  })

  const departments = await getDepartments()
  const shifts = await getShifts()
  const roles = await getRoles()

  const options = {
    department: departments.map((department) => {
      return {
        id: department.id,
        name: department.name,
      }
    }),
    shift: shifts.map((shift) => {
      return {
        id: shift.id,
        name: shift.name,
      }
    }),
    roles: roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
      }
    }),
  }

  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Manage Roster" description="View and manage roster entries" />
        {/* <AddButton /> */}
        <RosterAddModal options={options} />
      </div>
      <Separator />
      <RosterTable
        columns={RosterColumns}
        data={formattedRoster}
        options={options}
        filterKey="login"
      />
    </section>
  )
}

export default RosterPage
