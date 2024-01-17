import { getValleyGroups } from "@/actions/valley-groups"
import { getValleys } from "@/actions/valleys"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/composed/Heading"

import { ValleyColumns } from "./components/ValleyColumns"
import { ValleyTable } from "./components/ValleyTable"

const ValleysPage = async () => {
  const valleys = await getValleys(
    `*, 
    stations (*),
    valley_group:valley_groups (*)`
  )

  const formattedValleys = valleys.map((valley) => {
    return {
      id: valley.id,
      name: valley.name,
      updated_at: valley.updated_at,
      group_id: valley.group_id,
      valley_group: valley.valley_group.name,
      stations: valley.stations,
    }
  })

  const valleyGroups = await getValleyGroups()

  const options = {
    valley_groups: valleyGroups.map((group) => {
      return {
        id: group.id,
        name: group.name,
      }
    }),
  }

  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Manage Valleys" description="View and manage valley entries" />
      </div>
      <Separator />

      <ValleyTable columns={ValleyColumns} data={formattedValleys} options={options} />

      {/* 
      Table with filter for valley_group
      Display Valley Name, Station count, etc
      Quick deletion
      Quick add
      Edit page for editing a valley in full (edit action)
      Edit page allows editing valley name, tertiary details, and manage stations
      Stations can be edited (modal), deleted (confirm modal), and added (add modal)
      
      */}
    </section>
  )
}

export default ValleysPage
