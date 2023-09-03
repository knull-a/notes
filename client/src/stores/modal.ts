import { create } from "zustand";

type Store = {
  color: string;
  changeColor: (newColor: string) => void;
};

const useModalStore = create<Store>()((set) => ({
  color: "",
  changeColor: (newColor: string) => set(() => ({ color: newColor })),
}));

export default useModalStore;
