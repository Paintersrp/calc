"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FullDateData } from "@/actions/plans"
import axios from "axios"
import { format } from "date-fns"
import { toast } from "sonner"

import { Separator } from "@/components/ui/Separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { DatePicker } from "@/components/composed/DatePicker"
import { Heading } from "@/components/composed/Heading"
import { Loading } from "@/components/layout/Loading"

import { ShiftPlanDisplay } from "./components/ShiftPlanDisplay"

export default function Page() {
  const router = useRouter()

  const [data, setData] = useState<FullDateData>()
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState<boolean>(false)

  // Whenever our date selection changes, retrieve relevant data for new date
  useEffect(() => {
    const getDateData = async () => {
      if (date) {
        try {
          setLoading(true)

          const res: { data: FullDateData } = await axios.get(
            `/api/plans/${format(date, "yyyy-MM-dd")}`
          )

          setData(res.data)

          router.refresh()
        } catch (error) {
          console.error(error)

          toast.error("Roster entry failed.", {
            description: "Please verify your input and try again.",
          })
        } finally {
          setLoading(false)
        }
      }
    }

    getDateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 pt-4 sm:pt-6 md:py-10 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Shift Planner" description="View and manage daily staffing plans" />

        <DatePicker date={date} setDate={setDate} />
      </div>

      <Separator />

      {data && data.plans && !loading && (
        <Tabs defaultValue="0">
          <TabsList className="mb-2">
            <TabsTrigger className="w-28" value="0">
              Days (1st)
            </TabsTrigger>
            <TabsTrigger className="w-28" value="1">
              Days (2nd)
            </TabsTrigger>
            <TabsTrigger className="w-28" value="2">
              Nights (1st)
            </TabsTrigger>
            <TabsTrigger className="w-28" value="3">
              Nights (2nd)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="0">
            <ShiftPlanDisplay data={data.plans[0]} />
          </TabsContent>
          <TabsContent value="1">
            <ShiftPlanDisplay data={data.plans[1]} />
          </TabsContent>
          <TabsContent value="2">
            <ShiftPlanDisplay data={data.plans[2]} />
          </TabsContent>
          <TabsContent value="3">
            <ShiftPlanDisplay data={data.plans[3]} />
          </TabsContent>
        </Tabs>
      )}

      {loading && <Loading />}
    </section>
  )
}
