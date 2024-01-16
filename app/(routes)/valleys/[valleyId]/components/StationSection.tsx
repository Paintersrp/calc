import type { FC } from "react"

import { Tables } from "@/types/supabase"
import { DevCode } from "@/components/ui/DevCode"
import { Icons } from "@/components/ui/Icons"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/composed/Heading"

import { SectionContainer } from "./SectionContainer"
import { StationCard } from "./StationCard"

type GroupedStations = {
  [key: string]: Tables<"stations">[]
}

interface StationSectionProps {
  stations: Tables<"stations">[]
}

const StationSection: FC<StationSectionProps> = ({ stations }) => {
  const stationsByValley = stations.reduce<GroupedStations>((acc, station) => {
    const valleyNumber = station.name.split("-")[0]
    acc[valleyNumber] = acc[valleyNumber] || []
    acc[valleyNumber].push(station)
    return acc
  }, {})

  return (
    <SectionContainer>
      <div className="flex items-center space-x-4">
        <Icons.Group className="w-9 h-9 ml-4" />
        <Heading
          title="Stations"
          description="Maintain and update valley stations"
          titleClass="text-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(stationsByValley).map(([valleyNumber, stations]) => (
          <div key={valleyNumber} className="space-y-2 border rounded-lg p-4">
            <h3 className="text-xl font-semibold text-center tracking-tight">
              Valley {valleyNumber}
            </h3>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
              {stations.map((station, index) => (
                <StationCard key={index} station={station} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}

export { StationSection }
