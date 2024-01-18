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
  const handleUpdates = async (payload: any) => {
    const { data } = await supabase
      .from("valley_counts")
      .select("*, valley:valleys (*, stations (*), valley_group:valley_groups (*))")
      .eq("id", payload.new.id)
      .single()

    if (data) {
      setValleyCounts((prev) => {
        const quarterId = data.quarter_id
        const groupName = data.valley?.valley_group?.name || "Unknown"

        // If the quarter and group already exist, update the relevant item.
        // Otherwise, add the new item to the group.
        const updatedQuarterGroups = prev[quarterId] ? { ...prev[quarterId] } : {}
        updatedQuarterGroups[groupName] = updatedQuarterGroups[groupName] || []
        const itemIndex = updatedQuarterGroups[groupName].findIndex((item) => item.id === data.id)

        if (itemIndex > -1) {
          // Update existing item
          updatedQuarterGroups[groupName][itemIndex] = data
        } else {
          // Add new item to the group
          updatedQuarterGroups[groupName].push(data)
        }

        return { ...prev, [quarterId]: updatedQuarterGroups }
      })
    }
  }

  useEffect(() => {
    // Fetches and organizes the initial data
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("valley_counts")
        .select("*, valley:valleys (*, stations (*), valley_group:valley_groups (*))")
        .in("quarter_id", quarterIds)
        .order("id", { ascending: true })

      if (!error && data) {
        const groupedData = data.reduce((acc: any, item) => {
          // Group by quarter_id
          acc[item.quarter_id] = acc[item.quarter_id] || {}

          // Get the valley group name
          const groupName = item.valley?.valley_group?.name || "Unknown"

          // Group by valley group name within each quarter
          acc[item.quarter_id][groupName] = acc[item.quarter_id][groupName] || []
          acc[item.quarter_id][groupName].push(item)

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
