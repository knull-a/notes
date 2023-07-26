import { create } from "zustand";

type Store = {
  isColumn: boolean
  toggleColumn: () => void
}

export const useNavbarStore = create<Store>()((set) => ({
  isColumn: false,
  toggleColumn: () => set((state) => ({isColumn: !state.isColumn}))
}))