import { create } from "zustand"

interface SettingsTabsStore {
  selectedItemIndex: number
  direction: number
  setSelectedItem: (index: number, direction: number) => void
}

const useSettingsTabs = create<SettingsTabsStore>((set) => ({
  selectedItemIndex: 0,
  direction: 1,
  setSelectedItem: (index, direction) => {
    set({ selectedItemIndex: index, direction })
  },
}))

export { useSettingsTabs }
