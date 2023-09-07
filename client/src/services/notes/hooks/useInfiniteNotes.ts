import { useRest } from "@/services";
import { PathName } from "@/services/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const api = useRest();

export const useInfiniteNotes = (name: PathName, params?: object) =>
  useInfiniteQuery(
    [name],
    async ({ pageParam = 1 }) =>
      await api.notes.getNotes({ page: pageParam, sort: "-updatedAt", ...params })
  );
