import type { Note } from "@/services/notes/types";

import { useEffect } from "react";
import { useQuery, useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { useRest } from "@/services";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useHandleScroll } from "@/hooks/useHandleScroll";

import "./NotesPage.css";

const NotesPage = () => {
  const api = useRest();
  const queryClient = useQueryClient()


  const {
    data: pinnedNotes,
    isLoading: isPinnedLoading,
    isError: hasPinnedError,
  } = useQuery(["pinned"], async () => await api.pinned.getPinnedNotes());

  const { mutate, isLoading: isSubmitLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.postNote(newNote);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"])
  });

  const {
    data: notes,
    fetchNextPage,
    isLoading: isNotesLoading,
    isError: hasNotesError,
  } = useInfiniteQuery(
    ["notes"],
    async ({ pageParam = 1 }) => api.notes.getNotes({ page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.paging.currentPage < lastPage.paging.pages)
          return lastPage.paging.currentPage + 1;
        else return undefined;
      },
      keepPreviousData: true,
    }
  );

  const { register, handleSubmit, getValues, reset } = useForm<Note>();

  useEffect(() => {
    window.addEventListener("scroll", () => useHandleScroll(fetchNextPage));
    return () => window.removeEventListener("scroll", () => useHandleScroll(fetchNextPage));
  }, []);

  const onSubmit: SubmitHandler<Note> = async (data) => {
    mutate(data)
    reset()
  };


  if (isNotesLoading || isPinnedLoading)
    return (
      <div>
        <CustomLoader />
      </div>
    );

  if (hasNotesError || hasPinnedError) return <div>Query error</div>;

  console.log(notes);
  console.log(pinnedNotes);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-slightly-dark rounded-xl p-4 shadow-2xl max-w-xl m-auto"
      >
        <NotesForm getValues={getValues} register={register} isLoading={isSubmitLoading}  />
      </form>
      <NotesList title="Pinned" notes={pinnedNotes} />
      <NotesList
        title="Other notes"
        notes={notes.pages.map((page) => page.data).flat()}
      />
    </>
  );
};

export default NotesPage;
