import { notFound } from "next/navigation"
import { getValley } from "@/actions/valleys"

import { Tables } from "@/types/supabase"
import { getServerClient } from "@/lib/supabase/hook"
import { Heading } from "@/components/composed/Heading"

import { HeadcountSection } from "./components/HeadcountSection"
import { StationSection } from "./components/StationSection"
import { ValleyCountsByIdProvider } from "./components/ValleyCountByIdProvider"

type ValleyWithStationsAndGroup = (Tables<"valleys"> & {
  stations: Tables<"stations">[]
  valley_group: Tables<"valley_groups">
})[]

interface ValleyPageProps {
  params: { valleyId: string }
}

const ValleyPage = async ({ params }: ValleyPageProps) => {
  const supabase = getServerClient()

  const { data: valley, error } = await supabase
    .from("valleys")
    .select(
      `*, 
      stations (*),
      valley_group:valley_groups (*)`
    )
    .eq("id", params.valleyId)
    .order("id", { referencedTable: "stations", ascending: true })
    .returns<ValleyWithStationsAndGroup>()
    .single()

  if (error) return notFound()

  return (
    <ValleyCountsByIdProvider>
      <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-6">
        <div className="flex justify-between items-center">
          <Heading
            title={valley.name}
            description={`Valley Group: ${valley.valley_group.name}`}
            titleClass="text-4xl"
          />
          <span>Valley Select</span>
        </div>

        <HeadcountSection valleyId={params.valleyId} />

        <StationSection stations={valley.stations} />
      </section>
    </ValleyCountsByIdProvider>
  )
}

export default ValleyPage
