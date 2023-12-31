import { create } from "zustand"

interface ResultStore {
  requiredRate: number
  setRequiredRate: (currentRate: number) => void
}

const useResults = create<ResultStore>((set, get) => ({
  // Getters and Setters for calculated required rate
  requiredRate: 0,
  setRequiredRate: (requiredRate) => {
    set({ requiredRate })
  },
}))

export { useResults }
