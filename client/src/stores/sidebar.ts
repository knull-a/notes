import { StoreApi, create } from "zustand";
import { persist } from "zustand/middleware";
import { isMobile } from "react-device-detect";

type Store = {
  isActive: boolean;
  toggleActive: () => void;
};

export const useSidebarStore = create(
  persist(
    (set: StoreApi<Store>["setState"]) => ({
      isActive: isMobile ? true : false,
      toggleActive: () =>
        set((state: Store) => ({ isActive: !state.isActive })),
    }),
    {
      name: "sidebar-store",
    }
  )
);
