import { create } from "zustand"

interface AddModalStore {
  open: boolean
  setOpen: (open: boolean) => void
  onOpen: () => void
  onClose: () => void
}

export const useAddModal = create<AddModalStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}))
