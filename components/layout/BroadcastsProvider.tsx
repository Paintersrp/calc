"use client"

import { ReactNode, createContext, useContext, useEffect, useState, type FC } from "react"

import { Tables } from "@/types/supabase"
import { createClient } from "@/lib/supabase/client"

export type BroadcastType = Tables<"stations"> & { valley: Tables<"valleys"> | null }

interface BroadcastContextType {
  broadcasts: BroadcastType[]
  broadcastCount: number
}

const BroadcastsContext = createContext<BroadcastContextType | undefined>(undefined)

export function useBroadcasts() {
  const context = useContext(BroadcastsContext)

  if (!context) {
    throw new Error("useBroadcasts must be used within a BroadcastsProvider")
  }

  return context
}

const supabase = createClient()

// Provider allows us to use this realtime data as a singleton, avoiding multiple subscriptions and refetches of the data
export const BroadcastsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [broadcasts, setBroadcasts] = useState<BroadcastType[]>([])
  const [broadcastCount, setBroadcastCount] = useState(0)

  // Update our state only where needed

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("stations")
        .select("*, valley:valleys (*)")
        .eq("broadcast_open", true)

      if (error) {
        console.error("Error fetching broadcasts:", error)
        return
      }

      setBroadcasts(data)
      setBroadcastCount(data.length)
    }

    const handleUpdate = async (payload: any) => {
      const { data } = await supabase
        .from("stations")
        .select("*, valley:valleys (*)")
        .eq("id", payload.new.id)
        .single()

      if (data) {
        setBroadcasts((currentBroadcasts) => {
          const existingIndex = currentBroadcasts.findIndex((b) => b.id === data.id)
          let newBroadcasts = [...currentBroadcasts]

          if (data.broadcast_open && existingIndex === -1) {
            // Add new broadcast
            newBroadcasts = [...currentBroadcasts, data]
          } else if (!data.broadcast_open && existingIndex !== -1) {
            // Remove broadcast
            newBroadcasts = currentBroadcasts.filter((b) => b.id !== data.id)
          }

          // Update count outside of setBroadcasts
          setBroadcastCount(newBroadcasts.length)
          return newBroadcasts
        })
      }
    }

    fetchInitialData()

    const subscription = supabase
      .channel("stations")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stations" },
        handleUpdate
      )
      .subscribe()

    // Subscription cleanup
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <BroadcastsContext.Provider value={{ broadcasts, broadcastCount }}>
      {children}
    </BroadcastsContext.Provider>
  )
}
