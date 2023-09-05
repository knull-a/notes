import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { useHandleScroll } from "@/hooks/useHandleScroll";
import { useRest } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ArchivePage = () => {
  const api = useRest();
  const {
    data: archiveNotes,
    fetchNextPage,
    isLoading: isArchiveLoading,
    isError: hasArchiveError,
    refetch: refetchArchive,
  } = useInfiniteQuery(
    ["archive"],
    async ({ pageParam = 1 }) =>
      await api.notes.getNotes({
        page: pageParam,
        sort: "-updatedAt",
        isArchived: true,
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

  useEffect(() => {
    window.addEventListener("scroll", () => useHandleScroll(fetchNextPage));
    return () =>
      window.removeEventListener("scroll", () =>
        useHandleScroll(fetchNextPage)
      );
  }, []);

  if (isArchiveLoading || isArchiveLoading)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (hasArchiveError || hasArchiveError) return <div>Query error</div>;

  return (
    <div>
      <NotesList
        title="Archive"
        notes={archiveNotes?.pages.map((page) => page.data).flat()}
        refetch={refetchArchive}
        parentPage="archive"
      />
    </div>
  );
};

export default ArchivePage;
