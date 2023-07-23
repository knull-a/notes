import { create } from "zustand";
import { isMobile } from "react-device-detect";

type Store = {
  isActive: boolean
  toggleActive: () => void
}

export const useSidebarStore = create<Store>()((set) => ({
  isActive: isMobile ? true : false,
  toggleActive: () => set((state) => ({isActive: !state.isActive}))
}))