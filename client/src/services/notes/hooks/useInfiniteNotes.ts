import { useRest } from "@/services";
import { PathName } from "@/services/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const api = useRest();

export const useInfiniteNotes = (name: PathName, params?: object) =>
  useInfiniteQuery(
    [name],
    async ({ pageParam = 1 }) =>
      await api.notes.getNotes({
        page: pageParam,
        sort: "-updatedAt",
        ...params,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.paging.currentPage < lastPage.paging.pages)
          return lastPage.paging.currentPage + 1;
        else return undefined;
      },
      keepPreviousData: true,
    }
  );
