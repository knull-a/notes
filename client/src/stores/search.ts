import { Note } from "@/services/notes/types";
import { PathName } from "@/services/types";
import { create } from "zustand";

type SearchStore = {
  notes: Note[];
  pathName: PathName;
  searchText: string;
  setNotes: (newNotes: Note[]) => void;
  setPathName: (newPathName: PathName) => void;
  setSearchText: (newSearchText: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  notes: [],
  pathName: "notes",
  searchText: "",
  
  setPathName: (newPathName: PathName) =>
    set((state) => ({ pathName: (state.pathName = newPathName) })),

  setNotes: (newNotes) => set((state) => ({ notes: (state.notes = newNotes) })),
  
  setSearchText: (newSearchText) =>
    set((state) => ({ searchText: (state.searchText = newSearchText) })),
}));
