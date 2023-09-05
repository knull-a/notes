import type { Note } from "@/services/notes/types";

import { useEffect } from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useRest } from "@/services";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useHandleScroll } from "@/hooks/useHandleScroll";

import "./NotesPage.css";
import { usePinnedNotes } from "@/services/notes/hooks/usePinnedNotes";

const NotesPage = () => {
  const api = useRest();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isSubmitLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.postNote(newNote);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const {
    data: notes,
    fetchNextPage,
    isLoading: isNotesLoading,
    isError: hasNotesError,
    refetch: refetchNotes,
  } = useInfiniteQuery(
    ["notes"],
    async ({ pageParam = 1 }) =>
      await api.notes.getNotes({
        page: pageParam,
        sort: "-updatedAt",
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

  const {
    data: pinnedNotes,
    isLoading: isPinnedLoading,
    isError: hasPinnedError,
    refetch: refetchPinned,
  } = usePinnedNotes();

  const { register, handleSubmit, getValues, reset, setValue } =
    useForm<Note>();

  useEffect(() => {
    window.addEventListener("scroll", () => useHandleScroll(fetchNextPage));
    return () =>
      window.removeEventListener("scroll", () =>
        useHandleScroll(fetchNextPage)
      );
  }, []);

  async function onSubmit(data: Note) {
    mutate(data);
    await refetchNotes();
    reset();
  }

  if (isNotesLoading || isPinnedLoading)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (hasNotesError || hasPinnedError) return <div>Query error</div>;

  return (
    notes && (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-slightly-dark rounded-xl p-4 shadow-2xl max-w-xl m-auto mb-4"
        >
          <NotesForm
            setValue={setValue}
            getValues={getValues}
            register={register}
            isLoading={isSubmitLoading}
          />
        </form>
        {pinnedNotes.data !== undefined && (
          <NotesList
            parentPage="notes"
            title="Pinned"
            notes={pinnedNotes.data.flat()}
            refetch={refetchPinned}
          />
        )}
        <NotesList
          parentPage="notes"
          title="Other notes"
          notes={notes.pages.map((page) => page.data).flat()}
          refetch={refetchNotes}
        />
      </>
    )
  );
};

export default NotesPage;