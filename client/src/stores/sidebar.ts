import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isMobile } from "react-device-detect";

type Store = {
  isActive: boolean
  toggleActive: () => void
}

export const useSidebarStore = create(
  persist(
    (set) => ({
      isActive: isMobile ? true : false,
      toggleActive: () => set((state: Store) => ({ isActive: !state.isActive })),
    }),
    {
      name: 'sidebar-store',
    }
  )
)