import { create } from "zustand"
import { persist } from "zustand/middleware"

import { formatDecimalHours } from "../format-hours"

interface WeeklyInputStore {
  currentRateWeekly: number
  setCurrentRateWeekly: (currentRate: number) => void

  unitsProcessedWeekly: number
  setUnitsProcessedWeekly: (unitsProcessed: number) => void

  hoursWorkedWeekly: string
  setHoursWorkedWeekly: (hoursWorked: string) => void
  updateHoursWorkedWeekly: () => void
}

const useWeeklyInputStore = create(
  persist<WeeklyInputStore>(
    (set, get) => ({
      // Getters and Setters for Current AA Rate
      currentRateWeekly: 0,
      setCurrentRateWeekly: (currentRateWeekly) => {
        set({ currentRateWeekly })
        get().updateHoursWorkedWeekly()
      },

      // Getters and Setters for Current AA Units Processed
      unitsProcessedWeekly: 0,
      setUnitsProcessedWeekly: (unitsProcessedWeekly) => {
        set({ unitsProcessedWeekly })
        get().updateHoursWorkedWeekly()
      },

      // Derived state with getters and setters for AA Hours Worked
      hoursWorkedWeekly: "0",
      setHoursWorkedWeekly: (hoursWorkedWeekly) => {
        set({ hoursWorkedWeekly })
      },
      updateHoursWorkedWeekly: () => {
        const rate = get().currentRateWeekly
        const units = get().unitsProcessedWeekly
        const decimalHours = rate > 0 ? units / rate : 0
        const formattedHours = formatDecimalHours(decimalHours)

        set({ hoursWorkedWeekly: formattedHours })
      },
    }),
    {
      // Persist in local storage, and utilize first if it exists otherwise use assigned defaults
      name: "input-storage",
      getStorage: () => localStorage,
    }
  )
)

export default useWeeklyInputStore
