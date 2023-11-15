import { create } from "zustand";

type Store = {
  color: string;
  changeColor: (newColor: string) => void;
  isOpened: boolean;
  toggleModal: (status: boolean) => void;
};

const useModalStore = create<Store>()((set) => ({
  color: "",
  isOpened: false,
  
  changeColor: (newColor: string) => set(() => ({ color: newColor })),
  toggleModal: (status: boolean) => set(() => ({ isOpened: status })),
}));

export default useModalStore;
