import { create } from "zustand";

type Store = {
  color: string;
  changeColor: (newColor: string) => void;
  isOpened: boolean;
  toggleModal: (status: boolean) => void;
};

const useModalStore = create<Store>()((set) => ({
  color: "",
  changeColor: (newColor: string) => set(() => ({ color: newColor })),
  isOpened: false,
  toggleModal: (status: boolean) => set(() => ({ isOpened: status })),
}));

export default useModalStore;
