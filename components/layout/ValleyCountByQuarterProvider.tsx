"use client"

import { ReactNode, createContext, useContext, useEffect, useState, type FC } from "react"

import { createClient } from "@/lib/supabase/client"

const ValleyCountsByQuarterContext = createContext<ValleyCountsByQuarter | undefined>(undefined)

export function useValleyCountsByQuarterContext() {
  const context = useContext(ValleyCountsByQuarterContext)
  if (!context) {
    throw new Error("useValleyCountsContext must be used within a ValleyCountsProvider")
  }
  return context
}

const supabase = createClient()
const quarterIds = [1, 2, 3, 4]

// Provider allows us to use this realtime data as a singleton, avoiding multiple subscriptions and refetches of the data
export const ValleyCountsByQuarterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [valleyCounts, setValleyCounts] = useState<ValleyCountsByQuarter>({})

  // Update our state only where needed
  const handleUpdates = (payload: any) => {
    setValleyCounts((prev) => {
      const updatedQuarterCounts =
        prev[payload.new.quarter_id]?.map((item) =>
          item.id === payload.new.id ? payload.new : item
        ) || []
      return { ...prev, [payload.new.quarter_id]: updatedQuarterCounts }
    })
  }

  useEffect(() => {
    // Fetches and organizes the initial data
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("valley_counts")
        .select("*")
        .in("quarter_id", quarterIds)

      if (!error && data) {
        const groupedData = data.reduce((acc: any, item: any) => {
          acc[item.quarter_id] = acc[item.quarter_id] || []
          acc[item.quarter_id].push(item)
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
    <ValleyCountsByQuarterContext.Provider value={valleyCounts}>
      {children}
    </ValleyCountsByQuarterContext.Provider>
  )
}
