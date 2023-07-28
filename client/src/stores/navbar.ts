import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  isColumn: boolean;
  toggleColumn: () => void;
};

export const useNavbarStore = create(
  persist(
    (set: StoreApi<Store>["setState"]) => ({
      isColumn: false,
      toggleColumn: () => set((state) => ({ isColumn: !state.isColumn })),
    }),
    {
      name: "navbar-store",
    }
  )
);
