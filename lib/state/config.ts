import { create } from "zustand"
import { persist } from "zustand/middleware"

import { calculateRemainingHours } from "@/lib/hours-remaining"
import { shiftEndTimes } from "@/lib/shift-times"

import { formatDecimalHours } from "../format-hours"

interface ConfigStore {
  type: string
  setType: (type: string) => void

  shift: string
  setShift: (shift: string) => void

  targetRate: number
  setTargetRate: (targetRate: number) => void

  remainingHoursAuto: string
  setRemainingHoursAuto: (remainingHours: string) => void
  updateRemainingHoursAuto: () => void

  remainingHoursManual: number
  setRemainingHoursManual: (remainingHours: number) => void

  remainingHoursWeekly: number
  setRemainingHoursWeekly: (remainingHoursWeekly: number) => void
}

const useConfigStore = create(
  persist<ConfigStore>(
    (set, get) => ({
      // Getters and Setters for Config Type Input
      type: "daily",
      setType: (type) => {
        set({ type })
      },

      // Getters and Setters for Config Shift Input
      shift: "FHD",
      setShift: (shift) => {
        set({ shift })
        get().updateRemainingHoursAuto()
      },

      // Getters and Setters for Config Target Rate Input
      targetRate: 28,
      setTargetRate: (targetRate) => {
        set({ targetRate })
        get().updateRemainingHoursAuto()
      },

      // Derived state with getters and setters for the hours remaining in selected shift
      remainingHoursAuto: "0",
      setRemainingHoursAuto: (remainingHoursAuto) => {
        set({ remainingHoursAuto })
      },
      updateRemainingHoursAuto: () => {
        const endTime = shiftEndTimes[get().shift]
        const decimalHours = calculateRemainingHours(endTime)
        const formattedHours = formatDecimalHours(decimalHours)

        set({ remainingHoursAuto: formattedHours })
      },

      remainingHoursManual: 0,
      setRemainingHoursManual: (remainingHoursManual) => {
        set({ remainingHoursManual })
      },

      remainingHoursWeekly: 0,
      setRemainingHoursWeekly: (remainingHoursWeekly) => {
        set({ remainingHoursWeekly })
      },
    }),
    {
      name: "config-storage",
      getStorage: () => localStorage,
    }
  )
)

export default useConfigStore
