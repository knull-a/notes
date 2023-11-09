import { useRest } from "@/services";
import { PathName } from "@/services/types";
import { useSearchStore } from "@/stores/search";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useInfiniteNotes = (name: PathName, params?: object) => {
  const api = useRest();

  const { searchText } = useSearchStore();

  return useInfiniteQuery(
    [name],
    async ({ pageParam = 1 }) =>
      await api.notes.getNotes({
        page: pageParam,
        search: searchText,
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
};
