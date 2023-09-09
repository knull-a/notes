import { Note } from "@/services/notes/types";
import { PathName } from "@/services/types";
import { create } from "zustand";

type SearchStore = {
  notes: Note[];
  setNotes: (newNotes: Note[]) => void;
  pathName: PathName
  setPathName: (newPathName: PathName) => void
};

export const useSearchStore = create<SearchStore>((set) => ({
  notes: [],
  pathName: "notes",
  setPathName: (newPathName: PathName) => set((state) => ({ pathName: state.pathName = newPathName })),
  setNotes: (newNotes) => set((state) => ({ notes: (state.notes = newNotes) })),
}));
