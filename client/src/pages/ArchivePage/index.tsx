import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { useHandleScroll } from "@/hooks/useHandleScroll";
import { useRest } from "@/services";
import { useInfiniteNotes } from "@/services/notes/hooks/useInfiniteNotes";
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
  } = useInfiniteNotes("archive", {
    isArchived: true,
  });

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
