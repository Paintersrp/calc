"use client"

import { ReactNode, createContext, useContext, useEffect, useState, type FC } from "react"

import { createClient } from "@/lib/supabase/client"

const ValleyCountsByIdContext = createContext<ValleyCountsById | undefined>(undefined)

export function useValleyCountsByIdContext() {
  const context = useContext(ValleyCountsByIdContext)
  if (!context) {
    throw new Error("useValleyCountsContext must be used within a ValleyCountsProvider")
  }
  return context
}

const supabase = createClient()

// Provider allows us to use this realtime data as a singleton, avoiding multiple subscriptions and refetches of the data
export const ValleyCountsByIdProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [valleyCounts, setValleyCounts] = useState<ValleyCountsById>({})

  // Update our state only where needed
  const handleUpdates = (payload: any) => {
    console.log("here")
    console.log(payload)
    setValleyCounts((prev) => {
      const updatedValleyCounts =
        prev[payload.new.valley_id]?.map((item) =>
          item.id === payload.new.id ? payload.new : item
        ) || []
      return { ...prev, [payload.new.valley_id]: updatedValleyCounts }
    })
  }

  useEffect(() => {
    // Fetches and organizes the initial data by valley_id
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("valley_counts")
        .select(`*, quarter:quarters (name)`)
        .order("quarter_id", { ascending: true })

      console.log(data)

      if (!error && data) {
        const groupedData = data.reduce((acc: any, item: any) => {
          acc[item.valley_id] = acc[item.valley_id] || []
          acc[item.valley_id].push(item)
          return acc
        }, {})
        setValleyCounts(groupedData)
      } else {
        console.error("Error fetching valley counts:", error)
      }
    }

    fetchInitialData()

    // Subscribes to any update events to the table, using a handleUpdates callback function to progressively update the values in realtime.
    const subscription = supabase
      .channel("valley_counts")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "valley_counts" },
        handleUpdates
      )
      .subscribe()

    // Subscription cleanup
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <ValleyCountsByIdContext.Provider value={valleyCounts}>
      {children}
    </ValleyCountsByIdContext.Provider>
  )
}
