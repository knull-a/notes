import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  isColumn: boolean;
  toggleColumn: () => void;
};

export const useNavbarStore = create(
  persist(
    (set) => ({
      isColumn: false,
      toggleColumn: () =>
        set((state: Store) => ({ isColumn: !state.isColumn })),
    }),
    {
      name: "navbar-store",
    }
  )
);
