import { useRest } from "@/services";
import { useQuery } from "@tanstack/react-query";

const api = useRest();

export const useNotes = (name: string, params?: object) =>
  useQuery(
    [name],
    async () => await api.notes.getNotes({ sort: "-updatedAt", ...params })
  );
