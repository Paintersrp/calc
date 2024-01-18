import { notFound } from "next/navigation"

import type { Tables } from "@/types/supabase"
import { getServerClient } from "@/lib/supabase/hook"
import { Heading } from "@/components/composed/Heading"
import { Loading } from "@/components/layout/Loading"

import { HeadcountSection } from "./components/HeadcountSection"
import { StationSection } from "./components/StationSection"
import { ValleyCountsByIdProvider } from "./components/ValleyCountByIdProvider"

type ValleyWithStationsAndGroup = Tables<"valleys"> & {
  stations: Tables<"stations">[]
  valley_group: Tables<"valley_groups">
}

interface ValleyPageProps {
  params: { valleyId: string }
}

const ValleyPage = async ({ params }: ValleyPageProps) => {
  // const [valley, setValley] = useState<ValleyWithStationsAndGroup>()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await supabase
  //       .from("valleys")
  //       .select(
  //         `*,
  //             stations (*),
  //             valley_group:valley_groups (*)`
  //       )
  //       .eq("id", params.valleyId)
  //       .order("id", { referencedTable: "stations", ascending: true })
  //       .returns<ValleyWithStationsAndGroup[]>()
  //       .single()

  //     if (data) {
  //       setValley(data)
  //     }
  //   }

  //   const handleUpdates = async (payload: any) => {
  //     console.log(payload.new)

  //     if (payload.new.valley_id === params.valleyId) {
  //       const { data } = await supabase
  //         .from("valleys")
  //         .select(
  //           `*,
  //                 stations (*),
  //                 valley_group:valley_groups (*)`
  //         )
  //         .eq("id", params.valleyId)
  //         .order("id", { referencedTable: "stations", ascending: true })
  //         .returns<ValleyWithStationsAndGroup[]>()
  //         .single()

  //       if (data) {
  //         setValley(data)
  //       }
  //     }
  //   }

  //   fetchData()

  //   const subscription = supabase
  //     .channel("stations")
  //     .on(
  //       "postgres_changes",
  //       { event: "UPDATE", schema: "public", table: "stations" },
  //       handleUpdates
  //     )
  //     .subscribe()

  //   console.log("subscribed")

  //   return () => {
  //     subscription.unsubscribe()
  //     console.log("unsubscribed")
  //   }
  // }, [params])

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
    .returns<ValleyWithStationsAndGroup[]>()
    .single()

  if (error) return notFound()

  return (
    <ValleyCountsByIdProvider>
      <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-6">
        {valley ? (
          <>
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
          </>
        ) : (
          <Loading />
        )}
      </section>
    </ValleyCountsByIdProvider>
  )
}

export default ValleyPage
