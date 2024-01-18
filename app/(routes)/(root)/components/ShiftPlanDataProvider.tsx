import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { FullDateData } from "@/actions/plans"
import axios from "axios"
import { format } from "date-fns"
import { toast } from "sonner"

import { Tables } from "@/types/supabase"
import { GroupedByRole } from "@/app/api/associates/roster/route"

const ShiftPlanDataContext = createContext<{
  data: FullDateData | null
  roles: Tables<"roles">[]
  roster: GroupedByRole | null
  loading: boolean
  dateLoading: boolean
  router: AppRouterInstance | null
  refetchPlanData: () => Promise<void>
}>({
  data: null,
  roles: [],
  roster: null,
  loading: true,
  dateLoading: true,
  router: null,
  refetchPlanData: async () => {},
})

export const useShiftPlanData = () => {
  const context = useContext(ShiftPlanDataContext)

  if (!context) {
    throw new Error("useShiftPlanData must be used within a ShiftPlanDataProvider")
  }

  return context
}

export const ShiftPlanDataProvider = ({ date, children }: { date: Date; children: ReactNode }) => {
  const router = useRouter()

  const [data, setData] = useState<FullDateData | null>(null)
  const [roles, setRoles] = useState<Tables<"roles">[]>([])
  const [roster, setRoster] = useState<GroupedByRole | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [dateLoading, setDateLoading] = useState<boolean>(false)

  const refetchPlanData = async () => {
    try {
      const { data: newData } = await axios.get(`/api/plans/${format(date, "yyyy-MM-dd")}`)
      setData(newData)
      // Optionally, you can refresh the roles and roster here too if needed
    } catch (error) {
      console.error(error)
      toast.error("Data refetch failed.", {
        description: "Please refresh and try again.",
      })
    }
  }

  useEffect(() => {
    const getDateData = async () => {
      if (date) {
        try {
          setDateLoading(true)

          const { data } = await axios.get(`/api/plans/${format(date, "yyyy-MM-dd")}`)

          setData(data)

          router.refresh()
        } catch (error) {
          console.error(error)

          toast.error("Data fetch failed.", {
            description: "Please refresh and try again.",
          })
        } finally {
          setDateLoading(false)
        }
      }
    }

    getDateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)

        const { data } = await axios.get("/api/roles")
        const { data: roster } = await axios.get("/api/associates/roster")

        setRoles(data)
        setRoster(roster)

        router.refresh()
      } catch (error) {
        console.error(error)

        toast.error("Data fetch failed.", {
          description: "Please refresh and try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    data,
    roles,
    roster,
    loading,
    setLoading,
    dateLoading,
    router,
    refetchPlanData,
  }

  return <ShiftPlanDataContext.Provider value={value}>{children}</ShiftPlanDataContext.Provider>
}
