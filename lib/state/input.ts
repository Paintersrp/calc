import { create } from "zustand"
import { persist } from "zustand/middleware"

import { formatDecimalHours } from "../format-hours"

interface InputStore {
  currentRate: number
  setCurrentRate: (currentRate: number) => void

  unitsProcessed: number
  setUnitsProcessed: (unitsProcessed: number) => void

  hoursWorked: string
  setHoursWorked: (hoursWorked: string) => void
  updateHoursWorked: () => void
}

const useInputStore = create(
  persist<InputStore>(
    (set, get) => ({
      // Getters and Setters for Current AA Rate
      currentRate: 0,
      setCurrentRate: (currentRate) => {
        set({ currentRate })
        get().updateHoursWorked()
      },

      // Getters and Setters for Current AA Units Processed
      unitsProcessed: 0,
      setUnitsProcessed: (unitsProcessed) => {
        set({ unitsProcessed })
        get().updateHoursWorked()
      },

      // Derived state with getters and setters for AA Hours Worked
      hoursWorked: "0",
      setHoursWorked: (hoursWorked) => {
        set({ hoursWorked })
      },
      updateHoursWorked: () => {
        const rate = get().currentRate
        const units = get().unitsProcessed
        const decimalHours = rate > 0 ? units / rate : 0
        const formattedHours = formatDecimalHours(decimalHours)

        set({ hoursWorked: formattedHours })
      },
    }),
    {
      // Persist in local storage, and utilize first if it exists otherwise use assigned defaults
      name: "input-storage",
      getStorage: () => localStorage,
    }
  )
)

export { useInputStore }
