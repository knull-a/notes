import { useRest } from "@/services";
import { useQuery } from "@tanstack/react-query";

const api = useRest();

export const usePinnedNotes = () =>
  useQuery(
    ["pinnedNotes"],
    async () => await api.notes.getNotes({ isPinned: true, sort: "-updatedAt" })
  );
