import { useRest } from "@/services";
import { useQuery } from "@tanstack/react-query";

const api = useRest();

export const useNotes = () =>
  useQuery(
    ["notes"],
    async () => await api.notes.getNotes()
  );
