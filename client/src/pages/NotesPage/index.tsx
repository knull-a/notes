import type { Note } from "@/services/notes/types";

import { useEffect, useState } from "react";
import { useQueryClient, useMutation, QueryCache } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useRest } from "@/services";
import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotesList } from "@/components/Notes/NotesList";
import { NotesForm } from "@/components/Notes/NotesForm";
import { useHandleScroll } from "@/hooks/useHandleScroll";

import "./NotesPage.css";
import { useNotes } from "@/services/notes/hooks/useNotes";
import { useInfiniteNotes } from "@/services/notes/hooks/useInfiniteNotes";
import { useSearchParams } from "react-router-dom";

const NotesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const labelQuery = searchParams.get("label");
  const noteNameQuery = searchParams.get("name");
  const [formBackgroundColor, setFormBackgroundColor] = useState("");
  const api = useRest();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isSubmitLoading } = useMutation({
    mutationFn: async (newNote: Note) => {
      return await api.notes.postNote(newNote);
    },
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  console.log(labelQuery);

  const {
    data: notes,
    fetchNextPage,
    isLoading: isNotesLoading,
    isError: hasNotesError,
    refetch: refetchNotes,
  } = useInfiniteNotes(labelQuery ? "labelNotes" : "notes" , {
    label: labelQuery,
  });

  const {
    data: pinnedNotes,
    isLoading: isPinnedLoading,
    isError: hasPinnedError,
    refetch: refetchPinned,
  } = useNotes("pinned", {
    isPinned: true,
    label: labelQuery,
  });

  const { register, handleSubmit, getValues, reset, setValue, control } =
    useForm<Note>();

  async function onSubmit(data: Note) {
    mutate(data);
    await refetchNotes();
    await refetchPinned();
    reset();
  }

  useEffect(() => {
    window.addEventListener("scroll", () => useHandleScroll(fetchNextPage));
    return () => {
      window.removeEventListener("scroll", () =>
        useHandleScroll(fetchNextPage)
      );
    };
  }, []);

  useEffect(() => {
    console.log(notes, pinnedNotes)
    refetchPinned();
    refetchNotes();
  }, [labelQuery]);

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
          style={{ backgroundColor: formBackgroundColor }}
        >
          <NotesForm
            setValue={setValue}
            getValues={getValues}
            register={register}
            control={control}
            setFormBackgroundColor={setFormBackgroundColor}
            closeModal={() => reset()}
            isLoading={isSubmitLoading}
          />
        </form>
        {!!pinnedNotes.data.length && (
          <NotesList
            parentPage="notes"
            title="Pinned"
            notes={pinnedNotes.data.flat()}
          />
        )}
        <NotesList
          parentPage="notes"
          title={noteNameQuery || "Other notes"}
          notes={notes.pages.map((page) => page.data).flat()}
        />
      </>
    )
  );
};

export default NotesPage;
