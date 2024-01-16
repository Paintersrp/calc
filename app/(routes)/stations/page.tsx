import { getStations } from "@/actions/stations"
import { getValleyGroups } from "@/actions/valley-groups"
import { getValleys } from "@/actions/valleys"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/composed/Heading"

import { StationColumns } from "./components/StationColumns"
import { StationTable } from "./components/StationTable"

const StationsPage = async () => {
  const stations = await getStations(
    `*, 
    valley:valleys (*, valley_group:valley_groups (*))`
  )

  const formattedStations = stations.map((station) => {
    return {
      id: station.id,
      name: station.name,
      updated_at: station.updated_at,
      status: station.status,
      broadcast_open: station.broadcast_open ? "TRUE" : "FALSE",
      valley: station.valley.name,
      valley_group: station.valley.valley_group.name,
    }
  })

  const valleys = await getValleys()
  const valleyGroups = await getValleyGroups()

  const options = {
    valleys: valleys.map((group) => {
      return {
        id: group.id,
        name: group.name,
      }
    }),
    valley_groups: valleyGroups.map((group) => {
      return {
        id: group.id,
        name: group.name,
      }
    }),
    broadcast_options: [
      {
        id: "1",
        name: "TRUE",
      },
      {
        id: "2",
        name: "FALSE",
      },
    ],
  }

  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Manage Stations" description="View and manage station entries" />
      </div>
      <Separator />

      {/* <pre className="mt-2 w-[340px] rounded-md p-4">
        <code className="text-white">{JSON.stringify(stations, null, 2)}</code>
      </pre> */}

      <StationTable columns={StationColumns} data={formattedStations} options={options} />
    </section>
  )
}

export default StationsPage
