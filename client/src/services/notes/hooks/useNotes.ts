import { useRest } from "@/services";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const api = useRest();

export const useNotes = () =>
  useInfiniteQuery(
    ["notes"],
    async ({ pageParam = 1 }) =>
      await api.notes.getNotes({ page: pageParam, sort: "-updatedAt" })
  );
